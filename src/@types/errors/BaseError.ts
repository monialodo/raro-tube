export interface BaseError extends Error {
  name: string;
  httpStatus: number;
}
