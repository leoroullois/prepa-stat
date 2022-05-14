import { isValidObjectId } from "@utils/utils";
import isEmpty from "is-empty";
import Middleware from "./types";

export const isValidId: Middleware = (req, res, next) => {
   const id = req.query.id as string;
   if (isEmpty(id)) {
      console.error("⛔ id is required.");
      return res.status(400).json({ message: "Id is required." });
   }
   if (!isValidObjectId(id)) {
      console.error("⛔ id is not valid.");
      return res.status(400).json({ message: "Id is not valid." });
   }
   console.log("✅ id is valid.");
   return next();
};

export const isValidUserId: Middleware = (req, res, next) => {
   const id = req.body.userId as string;
   if (isEmpty(id)) {
      console.error("⛔ User id is required.");
      return res.status(400).json({ message: "User Id is required." });
   }
   if (!isValidObjectId(id)) {
      console.error("⛔ User id is not valid.");
      return res.status(400).json({ message: "User Id is not valid." });
   }
   console.log("✅ User id is valid.");
   return next();
};

export const isValidSchoolId: Middleware = (req, res, next) => {
   const id = req.body.schoolId as string;
   if (isEmpty(id)) {
      console.error("⛔ School id is required.");
      return res.status(400).json({ message: "School Id is required." });
   }
   if (!isValidObjectId(id)) {
      console.error("⛔ School id is not valid.");
      return res.status(400).json({ message: "School Id is not valid." });
   }
   console.log("✅ School id is valid.");
   return next();
};

