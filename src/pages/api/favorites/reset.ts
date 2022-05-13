import { resetUserFavorites } from "controllers";
import { isValidUserId, authentication } from "@middlewares/index";
import { connectDB } from "db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication, isValidUserId)
   .delete(resetUserFavorites);
export default connectDB(handler);

