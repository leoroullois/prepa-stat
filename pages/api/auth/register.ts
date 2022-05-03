import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, validateRegisterInput } from "@lib/auth";
import { connectDB } from "@lib/db";
import { User } from "@models/User";
import isEmpty from "is-empty";
import { Favorite } from "@models/Favorite";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(`${req.method} - ${req.url}`);
   // * Only POST method is accepted
   if (req.method === "POST") {
      console.log(`${req.method} - ${req.url}`);
      const { email, name, filiere, password1 } = req.body;
      console.log("BODY : ", req.body);
      // * Validation
      const validation = validateRegisterInput(req.body);
      if (validation.isValid) {
         const checkExistingEmail = await User.findOne({ email });
         const checkExistingUsername = await User.findOne({ name });

         // ? Send error response if duplicate user is found
         if (!isEmpty(checkExistingEmail)) {
            return res.status(422).json({ message: "Email already exists." });
         } else {
            // * Hash password
            const id = new mongoose.Types.ObjectId();
            const status = await User.create({
               _id: id,
               email,
               name,
               filiere,
               password: await hashPassword(password1),
            });
            const initFavs = await Favorite.create({
               _id: id,
               favorites: [],
            });
            // ? Send success response
            return res.status(201).json({ message: "User created", ...status });
         }
      } else {
         res.status(401).json(validation.errors);
      }
   } else {
      // * Response for other than POST method
      res.status(500).json({ message: "Route not valid" });
   }
};

export default connectDB(handler);

