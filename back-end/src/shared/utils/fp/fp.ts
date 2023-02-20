
import { Function1, get, partial, PropertyPath } from "lodash";

export type Fn<TArgs = any, TReturn = unknown> = (...args: TArgs[]) => TReturn;


export function not(fn: Fn): Fn<any, boolean> {
  return (...args: any[]) => !fn(...args);
}

export function isLessThan<TOperand1 extends number, TOperand2 extends number>(
  limitOperand: TOperand1
) {
  return (operand: TOperand2) => operand < limitOperand;
}

export function isMoreThan<TOperand1 extends number, TOperand2 extends number>(
  limitOperand: TOperand1
) {
  return (operand: TOperand2) => operand > limitOperand;
}


export function getPropFor<TValue extends object, TReturn = any>(
  propPath: PropertyPath
): Function1<TValue, TReturn> {
  return partial<TValue, PropertyPath, TReturn>(get, partial.placeholder, propPath);
}