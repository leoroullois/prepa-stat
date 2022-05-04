import { connectDB } from "@lib/db";
import { Favorite } from "@models/Favorite";
import { User } from "@models/User";
import isEmpty from "is-empty";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(req.method + " " + req.url);
   console.log("BODY :", req.body);
   const { userId, favorites } = JSON.parse(req.body);
   console.log("userId :", userId);
   console.log("favorites :", favorites);
   switch (req.method) {
      // * Replace the favorites of the specified user
      case "POST":
         try {
            const user = await Favorite.findOneAndUpdate(
               { _id: userId },
               { $set: { favorites: favorites } }
            );
            return res.status(200).json(user);
         } catch (err) {
            return res.status(500).json(err);
         }
      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};
export default connectDB(handler);

