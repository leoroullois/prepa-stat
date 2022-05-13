import { getSchoolById } from "controllers";
import { connectDB } from "db";
import { isValidId } from "@middlewares/index";
import nextConnect from "next-connect";

const handler = nextConnect().use(isValidId).get(getSchoolById);

export default connectDB(handler);

