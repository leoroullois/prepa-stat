import { connectDB } from "db";
import { getCoefsById } from "controllers/index";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>().get(getCoefsById);

export default connectDB(handler);