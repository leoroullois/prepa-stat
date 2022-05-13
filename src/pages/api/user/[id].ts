import { authentication } from "@middlewares/index";
import {
   deleteFavoritesById,
   deleteUserById,
   getUserById,
   updateUser,
} from "controllers";
import { connectDB } from "db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication)
   .get(getUserById)
   .delete(deleteUserById, deleteFavoritesById)
   .post(updateUser);

export default connectDB(handler);
