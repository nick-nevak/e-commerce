export type FalsyTypes = false | 0 | -0 | '' | NullishTypes;

export type NullishTypes = null | undefined;

export type NotFalsy<T> = T extends FalsyTypes ? never : T;

export type NotNullish<T> = T extends NullishTypes ? never : T;

export type Nullish<T> = T | undefined | null;

export type DeepPartial<T> = T extends object
  ? {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  : T;

export type ExpicitPartial<T> = T extends object
  ? {
    [P in keyof T]?: T[P] | undefined;
  }
  : T;

export type DeepRequired<T> = T extends object
  ? {
    [P in NonNullable<keyof T>]: DeepRequired<T[P]>;
  }
  : T;

export type ShallowRequired<T> = T extends object
  ? {
    [P in keyof T]: NonNullable<T[P]>;
  }
  : T;

export type WithId<TId = string> = {
  id: TId
}