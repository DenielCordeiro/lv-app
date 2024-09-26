import { BaseModel } from "../models/base-model";

export interface BaseAPI<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean | FormData
};
