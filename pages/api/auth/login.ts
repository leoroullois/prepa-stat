// import { validateLoginInput } from "./../../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import isEmpty from "is-empty";
import { User } from "@models/User";
import { validateLoginInput, verifyPassword } from "@lib/auth";
import { connectDB } from "@lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(`${req.method} - ${req.url}`);
   // * Only POST method is accepted
   if (req.method === "POST") {
      console.log("login body :", req.body);
      const { email, password, remember } = req.body;
      // * validation
      const validation = validateLoginInput(req.body);
      if (validation.isValid) {
         const user = await User.findOne({ email });
         if (isEmpty(user)) {
            return res.status(404).json({ message: "User not found." });
         } else if (await verifyPassword(password, user.password)) {
            const payload = {
               _id: user._id,
               email: user.email,
            };
            const token = jwt.sign(payload, process.env.JWT_KEY as string, {
               expiresIn: remember ? 31556926 : 0, // one year in seconds
            });
            res.setHeader("Authorization", token as string);

            return res.status(201).json({
               message: "User logged in.",
               token: "Bearer " + token,
               ...user,
            });
         } else {
            return res.status(401).json({ message: "Password is incorrect." });
         }
      } else {
         return res.status(401).json(validation.errors);
      }
   } else {
      // * Response for other than POST method
      return res.status(500).json({ message: "Route not valid" });
   }
};

export default connectDB(handler);

