import { resetUserFavorites } from "controllers";
import { isValidUserId, jwtAuthWithoutExpiration } from "@middlewares/index";
import { connectDB } from "db";
import nextConnect from "next-connect";

const handler = nextConnect()
   .use(jwtAuthWithoutExpiration, isValidUserId)
   .delete(resetUserFavorites);
export default connectDB(handler);

