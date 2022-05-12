import { authentication } from "./../../../backend/middlewares/authentication.middleware";
import {
   deleteFavoritesById,
   deleteUserById,
   getUserById,
   updateUser,
} from "@backend/controllers";
import { connectDB } from "backend/db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication)
   .get(getUserById)
   .delete(deleteUserById, deleteFavoritesById)
   .post(updateUser);

export default connectDB(handler);
