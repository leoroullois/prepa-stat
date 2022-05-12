import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@backend/db";
import nextConnect from "next-connect";
import { loginUser, validateUserLogin } from "@backend/controllers";

const handler = nextConnect<NextApiRequest, NextApiResponse>().post(
   validateUserLogin,
   loginUser
);

export default connectDB(handler);

