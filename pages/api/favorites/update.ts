import { replaceUserFavorites } from "@backend/controllers";
import { isValidUserId, authentication } from "@middlewares/index";
import { connectDB } from "backend/db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication, isValidUserId)
   .post(replaceUserFavorites);

export default connectDB(handler);

