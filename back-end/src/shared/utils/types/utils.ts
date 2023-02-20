import { FalsyTypes, NotFalsy, NotNullish, Nullish } from "./types";


export function isNullish<T>(value: Nullish<T>): value is undefined | null {
  return typeof value === 'undefined' || value === null;
}

export function isNotNullish<T>(value: T | null | undefined): value is NotNullish<T> {
  return typeof value !== 'undefined' || value !== null;
}

export function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}

export function throwIfNullish<T>(value: Nullish<T>, message?: string): T {
  if (isNullish(value)) {
    throw new Error(message ?? 'value is nullish');
  }

  return value;
}

export function assertNotNullish<T>(value: Nullish<T>): T {
  return value as T;
}

export function isTruthy<T>(value: T | FalsyTypes | Nullish<T>): value is NotFalsy<T> {
  return !!value;
}