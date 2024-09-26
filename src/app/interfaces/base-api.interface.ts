import { BaseCrud } from "./base-crud.interface";

export interface BaseAPI<T extends BaseCrud> {
  success: boolean,
  data: T | T[] | boolean | FormData
};
