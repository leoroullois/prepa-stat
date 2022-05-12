import nextConnect from "next-connect";
import { getSchools, postSchools } from "@backend/controllers";
import { connectDB } from "backend/db";

const handler = nextConnect().get(getSchools).post(postSchools);

export default connectDB(handler);

