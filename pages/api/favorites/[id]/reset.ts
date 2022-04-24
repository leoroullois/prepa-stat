import { connectDB } from "@lib/db";
import { Favorite } from "@models/Favorite";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;
   console.log("id : ", id);
   console.log(req.method + " " + req.url + " " + req.body);
   switch (req.method) {
      case "DELETE":
         const deleted = await Favorite.findOneAndUpdate(
            { _id: id },
            {
               $set: {
                  favorites: [],
               },
            }
         );
         return res.status(200).json(deleted);
      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};
export default connectDB(handler);

