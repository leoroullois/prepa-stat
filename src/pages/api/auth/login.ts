import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "db";
import nextConnect from "next-connect";
import { loginUser, validateUserLogin } from "controllers";

const handler = nextConnect<NextApiRequest, NextApiResponse>().post(
   validateUserLogin,
   loginUser
);

export default connectDB(handler);

