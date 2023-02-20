import { CategorySeed } from '@infra/seeds/categories.seed';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log, proceed, throwErrorIfNullish } from '@shared/utils/rx/rx-js';
import mongoose, { Model } from 'mongoose';
import { concat, firstValueFrom, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { CategoryDocument, CategoryModel } from './categories.schema';

const ObjectId = mongoose.Types.ObjectId;


@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(CategoryModel.name) private model: Model<CategoryDocument>,
  ) { }

  create = (name: string, parentId: string | null) => of(parentId).pipe(
    switchMap(parentId => parentId
      ? from(this.model.findOne({ _id: parentId }).exec()).pipe(
        throwErrorIfNullish(`Parent category with id ${parentId} not found`)
      )
      : proceed()
    )).pipe(
      map(parent => parent?.right ?? 1),
      switchMap((left) =>
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
          switchMap(() => new this.model({ name, left, right: left + 1 }).save())
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


  getAll = async () => {
    return this.model.aggregate([
      {
        $lookup: {
          from: "categories",
          let: { nodeLeft: "$left", nodeRight: "$right" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$left", "$$nodeLeft"] },
                    { $gte: ["$right", "$$nodeRight"] }
                  ]
                }
              }
            },
            { $count: "depth" }
          ],
          as: "parents"
        }
      },
      { $unwind: "$parents" },
      { $addFields: { depth: "$parents.depth" } },
      { $sort: { left: 1 } },
      { $project: { _id: 1, name: 1, depth: 1, left: 1, right: 1 } }
    ])
  }

  findLeafs = () => from(this.model.find(
    { $expr: { $eq: [{ $sum: ["$left", 1] }, "$right"] } },
    { _id: 1, name: 1, }
  ))

  findPath = (id: string) => from(this.model.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "categories",
        let: { l: "$left", r: "$right", nodeName: "$name" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $lte: ["$left", "$$l"] }, { $gte: ["$right", "$$r"] },]
              }
            }
          },
          { $sort: { left: 1 } }
        ],
        as: "parents"
      }
    },
    { $unwind: "$parents" },
    { $replaceRoot: { newRoot: '$parents' } }
  ]));

  findDirectChildren = (id: string) => from(this.model.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "categories",
        let: { nodeLeft: "$l", nodeRight: "$r" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $gte: ["$l", "$$nodeLeft"] }, { $lte: ["$r", "$$nodeRight"] }]
              }
            }
          }
        ],
        as: "children"
      }
    },
    //{ $unwind: "$parents" },
    { $addFields: { children: "$children" } },
    { $sort: { left: 1 } },
    { $project: { _id: 1, name: 1, children: 1, left: 1, right: 1 } }
  ]));


  findWithDepthById = (id: string) =>
    from(this.model.findById(id).exec()).pipe(
      throwErrorIfNullish(),
      tap(x => console.log('PARENT', x)),
      switchMap((parent) => from(this.model.aggregate([{
        $match: {
          $expr: {
            $and: [{ $gt: ["$left", parent.left] }, { $lt: ["$right", parent.right] },]
          }
        }
      },
      {
        $lookup: {
          from: "categories",
          let: { nodeLeft: "$left", nodeRight: "$right" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$left", "$$nodeLeft"] }, { $gte: ["$right", "$$nodeRight"] },
                    { $gt: ["$left", parent.left] }, { $lt: ["$right", parent.right] }
                  ]
                }
              }
            },
            { $count: "depth" }
          ],
          as: "parents"
        }
      },
      { $unwind: "$parents" },
      { $match: { $expr: { $eq: [1, "$parents.depth"] } } },
      { $addFields: { depth: "$parents.depth" } },
      { $sort: { left: 1 } },
      { $project: { _id: 1, name: 1, depth: 1, left: 1, right: 1 } }
      ]))
      )
    );

  findAllWithDepth = () => from(this.model.aggregate([
    {
      $lookup: {
        from: "categories",
        let: { nodeLeft: "$left", nodeRight: "$right" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $lte: ["$left", "$$nodeLeft"] }, { $gte: ["$right", "$$nodeRight"] }]
              }
            }
          },
          { $count: "depth" }
        ],
        as: "parents"
      }
    },
    { $unwind: "$parents" },
    { $addFields: { depth: "$parents.depth" } },
    { $sort: { left: 1 } },
    { $project: { _id: 1, name: 1, depth: 1, left: 1, right: 1 } }
  ]));


  getParentsOf = (categoryId: string) =>
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

  getChildrenOf = (categoryId: string) =>
    from(this.model.findOne({ _id: categoryId }).exec()).pipe(
      throwErrorIfNullish(`Category with id ${categoryId} not found`),
      switchMap(({ left, right }: CategoryDocument) => this.model
        .find({
          left: { $gt: left },
          right: { $lt: right },
        })
        .sort('left')
        .exec()
      )
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