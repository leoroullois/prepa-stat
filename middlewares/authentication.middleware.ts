import { IToken } from "@lib/type";
import jwt from "jsonwebtoken";
import Middleware from "./types";

export const authentication: Middleware = (req, res, next) => {
   if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
         const decoded = jwt.verify(
            token,
            process.env.JWT_KEY as string
         ) as IToken;
         req.user = decoded;
         return next();
      } catch (error) {
         return res.status(401).json({ message: "Token invalid" });
      }
   } else {
      return res.status(401).json({ message: "Token not provided" });
   }
};

