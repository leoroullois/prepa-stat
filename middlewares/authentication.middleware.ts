import { IToken } from "@lib/type";
import jwt from "jsonwebtoken";
import Middleware from "./types";

export const jwtAuth: Middleware = (req, res, next) => {
   if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
         const decoded = jwt.verify(
            token,
            process.env.JWT_KEY as string
         ) as IToken;
         req.user = decoded;
         console.log("✅ Authenticated successfully.");
         return next();
      } catch (error) {
         console.error("⛔ Token invalid", error);
         return res.status(401).json({ message: "Token invalid" });
      }
   } else {
      console.error("⛔ Token not provided");
      return res.status(401).json({ message: "Token not provided" });
   }
};

export const jwtAuthWithoutExpiration: Middleware = (req, res, next) => {
   if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
         const decoded = jwt.verify(token, process.env.JWT_KEY as string, {
            ignoreExpiration: true,
         }) as IToken;
         req.user = decoded;
         console.log("✅ Authenticated successfully.");
         return next();
      } catch (error) {
         console.error("⛔ Token invalid", error);
         return res.status(401).json({ message: "Token invalid" });
      }
   } else {
      console.error("⛔ Token not provided");
      return res.status(401).json({ message: "Token not provided" });
   }
};

