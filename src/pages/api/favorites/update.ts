import { replaceUserFavorites } from "controllers";
import { isValidUserId, authentication } from "@middlewares/index";
import { connectDB } from "db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication, isValidUserId)
   .post(replaceUserFavorites);

export default connectDB(handler);

