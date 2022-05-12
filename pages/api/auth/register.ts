import {
   registerNewUser,
   checkIfEmailExists,
   validateUserRegister,
} from "@backend/controllers";
import { connectDB } from "@backend/db";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>().post(
   checkIfEmailExists,
   validateUserRegister,
   registerNewUser
);

export default connectDB(handler);
