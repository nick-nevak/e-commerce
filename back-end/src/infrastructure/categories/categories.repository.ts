import { CategorySeed } from '@infra/seeds/categories.seed';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log, proceed, throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { concat, firstValueFrom, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { CategoryDocument, CategoryModel } from './categories.schema';

const ObjectId = mongoose.Types.ObjectId;


@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(CategoryModel.name) private model: Model<CategoryDocument>,
  ) { }

  findByName = (name: string) =>
    from(this.model.findOne({ name }).exec());

  findChildrenOf = (categoryId: string) =>
    from(this.model.findOne({ _id: categoryId }).exec()).pipe(
      throwErrorIfNullish(`Category with id ${categoryId} not found`),
      switchMap(({ left, right }: CategoryDocument) => this.model
        .find({
          left: { $gte: left },
          right: { $lte: right },
        })
        .sort({ left: 1, right: -1 })
        .exec()
      ),
      tap((x) => { console.log('fetched'); }),
    );


  findChildrenOf2 = (categoryId: string) => {

    const groupLevel = (): PipelineStage[] => ([
      { $sort: { left: 1 } },
      { $group: { _id: "$parent", children: { $push: "$$ROOT" } } },
      { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "parent" } },
      { $unwind: "$parent" },
      {
        $project: {
          _id: "$parent._id",
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
    for (let i = 0; i < 3; i++) {
      query = [...query, ...groupLevel()];
    }

    return from(this.model.aggregate(query)).pipe(map(x => x[0]));
  }

  findParentsOf = (categoryId: string) =>
    from(this.model.findOne({ _id: categoryId }).exec()).pipe(
      throwErrorIfNullish(`Category with id ${categoryId} not found`),
      switchMap(({ left, right }) => this.model
        .find({
          left: { $lt: left },
          right: { $gt: right },
        })
        .sort('left')
        .exec()
      )
    );

  create = (name: string, parentId: string | null) => of(parentId).pipe(
    switchMap(parentId => parentId
      ? from(this.model.findOne({ _id: parentId }).exec()).pipe(
        throwErrorIfNullish(`Parent category with id ${parentId} not found`)
      )
      : proceed()
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
    from(this.model.findOne({ _id: id }).exec()).pipe(
      throwErrorIfNullish(`Category with id ${id} not found`),
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

  seed = (root: CategorySeed) =>
    from(this.model.estimatedDocumentCount().exec()).pipe(
      switchMap(count => count === 0
        ? proceed().pipe(
          tap(async () => {
            const traverse = async ({ name, children }: CategorySeed, parentId: string | null) => {
              const { id } = await firstValueFrom(this.create(name, parentId));
              for (let child of children ?? []) {
                await traverse(child, id);
              }
            }
            traverse(root, null)
          }),
          log('Seed data added to the database.')
        )
        : proceed().pipe(
          log('Products already exist in the database. Skipping seed data.')
        )
      )
    );
}