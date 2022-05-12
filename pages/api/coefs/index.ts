import type { NextApiRequest, NextApiResponse } from "next";
import { getCoefs } from "@controllers/index";
import { connectDB } from "@backend/db";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>().get(getCoefs);

export default connectDB(handler);

