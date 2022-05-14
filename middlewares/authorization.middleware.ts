import { UserTypeId } from "@models/User";
import Middleware from "@middlewares/types";
export const authorization: Middleware = (req, res, next) => {
   const { user_type_id } = req.user;
   if (user_type_id === UserTypeId.Admin) {
      console.log("✅ User authorized.");
      return next();
   }
   console.error("⛔ User unauthorized.");
   return res.status(401).json({ message: "Unauthorized" });
};

