import { isValidObjectId } from "@backend/utils";
import isEmpty from "is-empty";
import Middleware from "./types";

export const isValidId: Middleware = (req, res, next) => {
   const id = req.query.id as string;
   if (isEmpty(id)) {
      return res.status(400).json({ message: "Id is required." });
   }
   if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Id is not valid." });
   }
   return next();
};
export const isValidUserId: Middleware = (req, res, next) => {
   const id = req.query.userId as string;
   if (isEmpty(id)) {
      return res.status(400).json({ message: "User Id is required." });
   }
   if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "User Id is not valid." });
   }
   return next();
};
export const isValidSchoolId: Middleware = (req, res, next) => {
   const id = req.query.schoolId as string;
   if (isEmpty(id)) {
      return res.status(400).json({ message: "School Id is required." });
   }
   if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "School Id is not valid." });
   }
   return next();
};

