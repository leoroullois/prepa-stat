import { resetUserFavorites } from "@backend/controllers";
import { isValidUserId, authentication } from "@backend/middlewares";
import { connectDB } from "backend/db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(authentication, isValidUserId)
   .delete(resetUserFavorites);
export default connectDB(handler);

