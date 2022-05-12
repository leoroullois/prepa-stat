import nextConnect from "next-connect";
import { connectDB } from "db";
import {
   deleteSchoolFromUserFavorites,
   addSchoolToUserFavorites,
   getFavoritesByUserId,
} from "controllers";
import { authentication, isValidId } from "@middlewares/index";

const handler = nextConnect()
   .use(authentication, isValidId)
   .get(getFavoritesByUserId)
   .post(addSchoolToUserFavorites)
   .delete(deleteSchoolFromUserFavorites);

export default connectDB(handler);

