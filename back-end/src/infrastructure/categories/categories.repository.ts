import { CategorySeed, generateCategoriesSeed, maxDepth } from '@infra/seeds/categories.seed';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log, proceed, throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import { Model, PipelineStage } from 'mongoose';
import { concat, firstValueFrom, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { CategoryDocument, CategoryGroupProjection, CategoryModel } from './categories.schema';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(CategoryModel.name) private model: Model<CategoryDocument>,
  ) { }

  findById = (id: string) => from(
    this.model.findById(id).exec()
  ).pipe(
    throwErrorIfNullish(`Category with id ${id} not found`)
  );

  findByName = (name: string) => from(
    this.model.findOne({ name }).exec()
  ).pipe(
    throwErrorIfNullish(`Category with name ${name} not found`)
  );

  findChildrenOf = (id: string) =>
    this.findById(id).pipe(
      switchMap(({ left, right }) =>
        this.model
          .find({
            left: { $gte: left },
            right: { $lte: right },
          })
          .sort({ left: 1, right: -1 })
          .exec()
      )
    );


  findFullTree = () => {
    const groupLevel = (): PipelineStage[] => ([
      { $sort: { left: 1 } },
      { $group: { _id: "$parent", children: { $push: "$$ROOT" } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "parent" } },
      { $unwind: "$parent" },
      {
        $project: {
          _id: "$parent._id",
          id: "$parent._id",
          name: "$parent.name",
          parent: "$parent.parent",
          children: "$children",
          left: "$parent.left",
          right: "$parent.right",
          depth: "$parent.depth",
        }
      },
    ]);

    let query: PipelineStage[] = [];
    for (let i = 0; i < maxDepth; i++) {
      query = [...query, ...groupLevel()];
    }

    return from(this.model.aggregate(query)).pipe(
      map((projection: { 0: CategoryGroupProjection }) => projection[0])
    );
  }

  getMaxDepth = () =>
    from(
      this.model.find().sort({ depth: -1 }).limit(1).exec()
    ).pipe(
      map(p => p[0].depth)
    );

  findParentsOf = (id: string) =>
    this.findById(id).pipe(
      switchMap(({ left, right }) => this.model
        .find({
          left: { $lt: left },
          right: { $gt: right },
        })
        .sort('left')
        .exec()
      )
    );

  findAllLeafs = () =>
    this.getMaxDepth().pipe(
      switchMap((maxDepth) => this.model.find({ depth: maxDepth }).exec())
    );

  findLeafsOf = (id: string) =>
    this.findById(id).pipe(
      switchMap(({ left, right }) =>
        this.getMaxDepth().pipe(
          switchMap((maxDepth) =>
            this.model.find({
              depth: maxDepth,
              left: { $gte: left },
              right: { $lte: right },
            }).exec()
          )
        )
      )
    )

  create = (name: string, parentId: string | null) => of(parentId).pipe(
    switchMap((parentId) =>
      parentId ? this.findById(parentId) : proceed()
    )).pipe(
      map(parent => ({ parent, left: parent?.right ?? 1 })),
      switchMap(({ parent, left }) =>
        forkJoin([
          this.model.updateMany(
            { right: { $gte: left } },
            { $inc: { right: 2 } },
          ).exec(),
          this.model.updateMany(
            { left: { $gt: left } },
            { $inc: { left: 2 } }
          ).exec()
        ]).pipe(
          switchMap(() => new this.model({
            name,
            left,
            right: left + 1,
            depth: (parent?.depth ?? 0) + 1,
            parent: parent?._id ?? null
          }).save())
        )
      )
    );

  deleteById = (id: string) =>
    this.findById(id).pipe(
      map(({ left, right }) => ({ left, right, width: right - left + 1 })),
      switchMap(({ left, right, width }) =>
        concat(
          this.model.deleteMany({ left: { $gte: left, $lte: right } }).exec(),
          forkJoin([
            this.model.updateMany(
              { right: { $gte: right } },
              { $inc: { right: -width } },
            ).exec(),
            this.model.updateMany(
              { left: { $gt: right } },
              { $inc: { left: -width } },
            ).exec()
          ])
        )
      ),
      map(() => null)
    );

  seed = () =>
    from(this.model.estimatedDocumentCount().exec()).pipe(
      switchMap(count => count === 0
        ? of(generateCategoriesSeed()).pipe(
          tap(async (root) => {
            const traverse = async ({ name, children }: CategorySeed, parentId: string | null) => {
              const { id } = await firstValueFrom(this.create(name, parentId));
              for (let child of children ?? []) {
                await traverse(child, id);
              }
            }
            traverse(root, null)
          }),
          log('Seed categories added to the database.')
        )
        : proceed().pipe(
          log('Categories already exist in the database. Skipping seed data.')
        )
      )
    );
}