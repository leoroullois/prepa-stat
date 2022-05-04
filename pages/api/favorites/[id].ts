import { connectDB } from "@lib/db";
import { Favorite, IFavorite } from "@models/Favorite";
import isEmpty from "is-empty";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(req.method + " " + req.url);
   const { id } = req.query;
   switch (req.method) {
      case "GET":
         if (isEmpty(id)) {
            return res.status(404).json({ message: "Wrong research." });
         } else {
            const favorites = await Favorite.findById(id);
            if (isEmpty(favorites)) {
               return res.status(404).json({ message: "Wrong research." });
            } else {
               return res.status(200).json(favorites);
            }
         }
      case "POST":
         if (isEmpty(id)) {
            return res.status(404).json({ message: "Wrong research." });
         } else {
            const { schoolId } = JSON.parse(req.body);
            console.log("schoolId ", schoolId);
            const favorites = await Favorite.findById(id); // ? favoris de l'utilisateur
            if (isEmpty(favorites)) {
               return res.status(404).json({ message: "Wrong research." });
            }
            favorites.favorites.push(schoolId);
            const newFavorites = await Favorite.updateOne(
               { _id: id },
               favorites
            );
            return res.status(200).json(favorites);
         }
      case "DELETE":
         const { schoolId } = JSON.parse(req.body);
         console.log("schoolId ", schoolId);
         if (isEmpty(schoolId)) {
            return res.status(404).json({ message: "schoolId is undefined." });
         }
         const favs = await Favorite.findById(id);
         if (isEmpty(favs)) {
            return res.status(404).json({ message: "No favorites found." });
         }

         const newFavs = favs.favorites.filter(
            (fav: string) => fav !== schoolId
         );

         const updated = await Favorite.findOneAndUpdate(
            { _id: id },
            {
               $set: {
                  favorites: newFavs,
               },
            }
         );
         return res.status(200).json(updated);
      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};
export default connectDB(handler);

