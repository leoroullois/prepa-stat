import { getSchoolById } from "@backend/controllers";
import { connectDB } from "@backend/db";
import { isValidId } from "@backend/middlewares";
import nextConnect from "next-connect";

const handler = nextConnect().use(isValidId).get(getSchoolById);

export default connectDB(handler);

