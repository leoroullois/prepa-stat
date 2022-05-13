import {
   registerNewUser,
   checkIfEmailExists,
   validateUserRegister,
} from "controllers";
import { connectDB } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>().post(
   checkIfEmailExists,
   validateUserRegister,
   registerNewUser
);

export default connectDB(handler);
