import nextConnect from "next-connect";
import { getSchools, postSchools } from "@controllers/index";
import { connectDB } from "db";

const handler = nextConnect().get(getSchools).post(postSchools);

export default connectDB(handler);

