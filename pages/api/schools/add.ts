import { connectDB } from "@lib/db";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { School } from "@models/School";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(req.method + " " + req.url);
   switch (req.method) {
      case "POST":
         const school = JSON.parse(req.body);
         const id = new mongoose.Types.ObjectId();
         try {
            const postedSchool = await School.create({
               _id: id,
               ...school,
            });
            if (!postedSchool) {
               return res.status(500).json({ message: "School not posted" });
            }
            return res.status(201).json({
               message: "School created in database",
               payload: postedSchool,
            });
         } catch (err) {
            return res.status(500).json({
               message: "Error posting school to database.",
               error: err,
            });
         }

      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};

export default connectDB(handler);

