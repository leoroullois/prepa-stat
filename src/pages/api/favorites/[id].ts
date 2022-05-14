import nextConnect from "next-connect";
import { connectDB } from "db";
import {
   deleteSchoolFromUserFavorites,
   addSchoolToUserFavorites,
   getFavoritesByUserId,
} from "controllers";
import { jwtAuthWithoutExpiration, isValidId } from "@middlewares/index";

const handler = nextConnect()
   .use(jwtAuthWithoutExpiration, isValidId)
   .get(getFavoritesByUserId)
   .post(addSchoolToUserFavorites)
   .delete(deleteSchoolFromUserFavorites);

export default connectDB(handler);

