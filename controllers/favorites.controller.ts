import { Favorite } from "@models/Favorite";
import isEmpty from "is-empty";
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
   const { id } = req.query;
   const { schoolId } = JSON.parse(req.body);
   try {
      const favorites = await Favorite.findById(id);
      if (isEmpty(favorites)) {
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      favorites.favorites.push(schoolId);
      const newFavorites = await Favorite.updateOne({ _id: id }, favorites);
      return res.status(200).json(newFavorites);
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const deleteSchoolFromUserFavorites: Controller = async (req, res) => {
   const { id } = req.query;
   const { schoolId } = JSON.parse(req.body);
   if (isEmpty(schoolId)) {
      return res.status(404).json({ message: "schoolId is undefined." });
   }
   const favs = await Favorite.findById(id);
   if (isEmpty(favs)) {
      return res.status(404).json({ message: "No favorites found." });
   }

   const newFavs = favs.favorites.filter((favId: string) => favId !== schoolId);

   const updated = await Favorite.findOneAndUpdate(
      { _id: id },
      {
         $set: {
            favorites: newFavs,
         },
      }
   );
   return res.status(200).json(updated);
};

export const resetUserFavorites: Controller = async (req, res) => {
   const { userId } = JSON.parse(req.body);
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
         return res.status(404).json({ message: "No favorites found." });
      }
      return res.status(200).json(deleted);
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const replaceUserFavorites: Controller = async (req, res) => {
   const { userId, favorites } = JSON.parse(req.body);
   try {
      const user = await Favorite.findOneAndUpdate(
         { _id: userId },
         { $set: { favorites: favorites } }
      );
      if (isEmpty(user)) {
         return res.status(404).json({ message: "No favorites found." });
      }
      return res.status(200).json(user);
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

