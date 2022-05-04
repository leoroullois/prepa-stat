import { connectDB } from "@lib/db";
import { Favorite, IFavorite } from "@models/Favorite";
import isEmpty from "is-empty";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(req.method + " " + req.url);
   console.log(req.body);
   const { userId } = JSON.parse(req.body);
   switch (req.method) {
      // * Delete all favorites of the specified user
      case "DELETE":
         const deleted = await Favorite.findOneAndUpdate(
            { _id: userId },
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

