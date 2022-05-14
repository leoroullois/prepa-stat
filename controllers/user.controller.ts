import isEmpty from "is-empty";

import { hashPassword, verifyPassword } from "@lib/auth";
import { Favorite } from "@models/Favorite";
import { User } from "@models/User";

import Controller from "./types";

export const getUserById: Controller = async (req, res) => {
   const { id } = req.query;
   try {
      const user = await User.findById(id);
      if (!user) {
         console.error("⛔ Error fetching user.");
         return res.status(404).json({ message: "Error fetching user." });
      }
      console.log("✅  User found.");
      return res.status(200).json(user);
   } catch (err) {
      console.error("⛔ An error has occured.");
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};
export const deleteUserById: Controller = async (req, res, next) => {
   try {
      const { id } = req.query;
      const user = await User.findByIdAndDelete(id);
      if (isEmpty(user)) {
         console.error("⛔ Error fetching user.");
         return res.status(404).json({ message: "Error fetching user." });
      }
      console.log("✅ User deleted.");
      return next();
   } catch (err) {
      console.error("⛔ An error has occured.");
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const deleteFavoritesById: Controller = async (req, res, next) => {
   try {
      const { id } = req.query;
      const favorites = await Favorite.findByIdAndDelete(id);
      if (isEmpty(favorites)) {
         console.error("⛔ Error fetching favorites.");
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      console.log("✅ Favorites deleted.");
      return res.json({ message: "User and favorites deleted." });
   } catch (err) {
      console.error("⛔ An error has occured.");
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const updateUser: Controller = async (req, res, next) => {
   const { id } = req.query;
   try {
      const { name, filiere, pass } = req.body;
      const user = await User.findById(id);
      if (isEmpty(user)) {
         console.error("⛔ Error fetching user.");
         return res.status(404).json({ message: "Error fetching user." });
      } else {
         if (!isEmpty(pass)) {
            const { currPassword, newPassword, confirmPassword } = pass;

            const valid = await verifyPassword(currPassword, user.password);
            if (valid) {
               if (newPassword === confirmPassword) {
                  const updatedUser = await User.findOneAndUpdate(
                     { _id: id },
                     {
                        name,
                        filiere,
                        password: await hashPassword(newPassword),
                     }
                  );
                  console.log("✅ User updated.");
                  return res.status(200).json(updatedUser);
               }
            } else {
               console.error("⛔ Password is not valid. User not updated.");
               return res.status(401).json({
                  message: "Password is not valid. User not updated",
               });
            }
         } else {
            const updatedUser = await User.findOneAndUpdate(
               { _id: id },
               { name, filiere }
            );
            return res.status(200).json(updatedUser);
         }
      }
   } catch (err) {
      console.error("⛔ An error has occured.");
      return res.status(404).json(err);
   }
};

