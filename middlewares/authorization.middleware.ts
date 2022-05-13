import { UserTypeId } from "@models/User";
import Middleware from "@middlewares/types";
export const authorization: Middleware = (req, res, next) => {
   const { user_type_id } = req.user;
   if (user_type_id === UserTypeId.Admin) {
      return next();
   }
   return res.status(401).json({ message: "Unauthorized" });
};

