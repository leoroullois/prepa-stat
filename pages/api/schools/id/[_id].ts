import { ObjectId } from "mongodb";
import { getAllSchools } from "@lib/schools.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/db";
import { getSchools1, getSchools2, getSchools3 } from "@lib/schools.middleware";
import isEmpty from "is-empty";
import { School } from "@models/School";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   const _id: string = req.query._id as string;
   switch (req.method) {
      case "GET":
         if (isEmpty(_id)) {
            res.status(400).json({ message: "ID is required" });
         } else if (!ObjectId.isValid(_id)) {
            res.status(400).json({ message: "ID is not valid" });
         } else {
            const school = await School.findById(_id);
            if (isEmpty(school)) {
               res.status(404).json({ message: "School not found" });
            } else {
               return res.status(200).json(school);
            }
         }

      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};
export default connectDB(handler);

