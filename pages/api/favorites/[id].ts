import nextConnect from "next-connect";
import { connectDB } from "backend/db";
import {
   deleteSchoolFromUserFavorites,
   addSchoolToUserFavorites,
   getFavoritesByUserId,
} from "@backend/controllers";
import { authentication, isValidId } from "@backend/middlewares";

const handler = nextConnect()
   .use(authentication, isValidId)
   .get(getFavoritesByUserId)
   .post(addSchoolToUserFavorites)
   .delete(deleteSchoolFromUserFavorites);

export default connectDB(handler);

