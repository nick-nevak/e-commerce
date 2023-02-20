import { map, Observable, of, pipe, UnaryFunction } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { throwIfNullish } from "../types/utils";

export const debug = <TInput>() => pipe(
  tap<TInput>(value => {
    debugger;
  })
)

export const log = <TInput>(message: string,) =>
  pipe(
    tap<TInput>(value => {
      console.log(message, value);
    })
  );


export const proceed = () => of(undefined);

export const throwErrorIfNullish = <TInput>(message?: string) =>
  pipe(
    map((value: TInput | undefined | null) => throwIfNullish(value, message))
  );


export type SuppressedError = 'SUPRESSED_ERROR';
export const SUPRESSED_ERROR: SuppressedError = 'SUPRESSED_ERROR';

export const suppressError = <TInput>(
  errorHandler?: (error: any) => void
): UnaryFunction<Observable<TInput>, Observable<TInput | SuppressedError>> =>
  pipe(
    catchError(error => {
      errorHandler?.(error);
      return of(SUPRESSED_ERROR);
    })
  );

export const isError = (value: unknown): value is SuppressedError => value === SUPRESSED_ERROR;
export const isSuccessful = <T>(value: T | SuppressedError): value is T => value !== SUPRESSED_ERROR;