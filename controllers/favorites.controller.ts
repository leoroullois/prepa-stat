import { Favorite } from "@models/Favorite";
import isEmpty from "is-empty";
import { GiConsoleController } from "react-icons/gi";
import Controller from "./types";

export const getFavoritesByUserId: Controller = async (req, res) => {
   const { id } = req.query;
   try {
      const favorites = await Favorite.findById(id);
      if (isEmpty(favorites)) {
         return res.status(404).json({ message: "Error fetching favorites." });
      } else {
         return res.status(200).json(favorites);
      }
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const addSchoolToUserFavorites: Controller = async (req, res) => {
   try {
      const { id } = req.query;
      const { schoolId } = req.body;
      const favorites = await Favorite.findById(id);
      if (isEmpty(favorites)) {
         console.error("⛔ Error fetching favorites.");
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      favorites.favorites.push(schoolId);
      const newFavorites = await Favorite.updateOne({ _id: id }, favorites);
      console.log("✅ School is added to favorites.", favorites);
      return res.status(200).json(favorites);
   } catch (err) {
      console.error("⛔ An error has occured.", err);
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const deleteSchoolFromUserFavorites: Controller = async (req, res) => {
   try {
      const { id } = req.query;
      const { schoolId } = req.body;
      const favs = await Favorite.findById(id);
      if (isEmpty(favs)) {
         console.error("⛔ Error fetching favorites.");
         return res.status(404).json({ message: "Error fetching favorites." });
      }

      const newFavs = favs.favorites.filter(
         (favId: string) => favId !== schoolId
      );

      const updated = await Favorite.findOneAndUpdate(
         { _id: id },
         {
            $set: {
               favorites: newFavs,
            },
         }
      );
      console.log("✅ School is deleted from favorites.");
      return res.status(200).json(updated);
   } catch (err) {
      console.error("⛔ An error has occured.", err);
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const resetUserFavorites: Controller = async (req, res) => {
   const { userId } = req.body;
   try {
      const deleted = await Favorite.findOneAndUpdate(
         { _id: userId },
         {
            $set: {
               favorites: [],
            },
         }
      );
      if (isEmpty(deleted)) {
         console.error("⛔  Error fetching favorites.");
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      console.log("✅ Favorites deleted.");
      return res.status(200).json(deleted);
   } catch (err) {
      console.error("⛔  An error as occured.", err);
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const replaceUserFavorites: Controller = async (req, res) => {
   try {
      const { userId, favorites } = req.body;
      const user = await Favorite.findOneAndUpdate(
         { _id: userId },
         { $set: { favorites: favorites } }
      );
      if (isEmpty(user)) {
         console.error("⛔  Error fetching favorites.");
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      console.log("✅ Favorites have been replaced.");
      return res.status(200).json(user);
   } catch (err) {
      console.error("⛔  An error as occured.", err);
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

