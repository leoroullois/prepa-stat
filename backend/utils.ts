import { ObjectId } from "mongodb";
import isEmpty from "is-empty";

export const removeNullValuesFromObject = (obj: object): object => {
   return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => !isEmpty(value))
   );
};

export const isValidObjectId = (id: string): boolean => {
   return ObjectId.isValid(id);
};
