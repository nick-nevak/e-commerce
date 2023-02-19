import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { concat, forkJoin, from, map, switchMap, tap } from 'rxjs';
import { CategoryDocument, CategoryModel } from './categories.schema';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(CategoryModel.name) private model: Model<CategoryDocument>,
  ) { }

  createCategory = (name: string, parentId?: string) =>
    from(this.model.findOne({ _id: parentId })).pipe(
      tap(parent => {
        if (!parent) throw new Error(`Parent category with id ${parentId} not found`)
      }),
      map(parent => ({ parent, left: parent?.right ?? 1 })),
      switchMap(({ parent, left }) =>
        forkJoin([
          this.model.updateMany(
            { right: { $gte: left } },
            { $inc: { right: 2 } },
          ),
          this.model.updateMany(
            { left: { $gt: left } },
            { $inc: { left: 2 } })
        ]).pipe(
          switchMap(() => new this.model({ name, left, right: left + 1, parent }).save())
        )
      )
    );

  deleteCategory = (id: string) =>
    from(this.model.findOne({ _id: id })).pipe(
      tap((category) => {
        if (!category) throw new Error(`Category with id ${id} not found`);
      }),
      map(({ left, right }: CategoryDocument) => ({ left, right, width: right - left + 1 })),
      switchMap(({ left, right, width }) =>
        concat(
          this.model.deleteMany({ left: { $gte: left, $lte: right } }),
          forkJoin([
            this.model.updateMany(
              { right: { $gte: right } },
              { $inc: { right: -width } },
            ),
            this.model.updateMany(
              { left: { $gt: right } },
              { $inc: { left: -width } },
            )
          ])
        )),
      map(() => null)
    );


  getParentCategories = (categoryId: string) =>
    from(this.model.findOne({ _id: categoryId })).pipe(
      tap((category) => {
        if (!category) throw new Error(`Category with id ${categoryId} not found`);
      }),
      switchMap(({ left, right }: CategoryDocument) => this.model
        .find({
          left: { $lt: left },
          right: { $gt: right },
        })
        .sort('left')
      )
    );

  getChildCategories = (categoryId: string) =>
    from(this.model.findOne({ _id: categoryId })).pipe(
      tap((category) => {
        if (!category) throw new Error(`Category with id ${categoryId} not found`);
      }),
      switchMap(({ left, right }: CategoryDocument) => this.model
        .find({
          left: { $gt: left },
          right: { $lt: right },
        })
        .sort('left')
      )
    );
}