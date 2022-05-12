import { Favorite } from "@backend/models/Favorite";
import { User } from "@backend/models/User";
import isEmpty from "is-empty";
import Controller from "./types";
import { hashPassword, verifyPassword } from "@lib/auth";

export const getUserById: Controller = async (req, res) => {
   const { id } = req.query;
   try {
      const user = await User.findById(id);
      if (!user) {
         return res.status(404).json({ message: "Error fetching user." });
      }
      return res.status(200).json(user);
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};
export const deleteUserById: Controller = async (req, res, next) => {
   try {
      const { id } = req.query;
      const user = User.findByIdAndDelete(id);
      if (isEmpty(user)) {
         return res.status(404).json({ message: "Error fetching user." });
      }
      return next();
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const deleteFavoritesById: Controller = async (req, res, next) => {
   try {
      const { id } = req.query;
      const favorites = Favorite.findByIdAndDelete(id);
      if (isEmpty(favorites)) {
         return res.status(404).json({ message: "Error fetching favorites." });
      }
      return res.json({ message: "User and favorites deleted." });
   } catch (err) {
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
         return res.status(404).json({ message: "User is empty." });
      } else {
         if (!isEmpty(pass)) {
            const { currPassword, newPassword, confirmPassword } = pass;

            const valid = await verifyPassword(currPassword, user.password);
            if (valid) {
               if (newPassword === confirmPassword) {
                  try {
                     const updatedUser = await User.findOneAndUpdate(
                        { _id: id },
                        {
                           name,
                           filiere,
                           password: await hashPassword(newPassword),
                        }
                     );
                     return res.status(200).json({
                        message: "User updated.",
                        user: updatedUser,
                     });
                  } catch (err) {
                     console.log("err", err);
                     return res.status(400).json({
                        message: "An error has occured.",
                        error: err,
                     });
                  }
               }
            } else {
               return res.status(401).json({
                  message: "Password is not valid. User not updated",
               });
            }
         } else {
            try {
               const updatedUser = await User.findOneAndUpdate(
                  { _id: id },
                  { name, filiere }
               );
               return res.status(200).json({
                  message: "User updated.",
                  user: updatedUser,
               });
            } catch (err) {
               console.log("err", err);
               return res.status(400).json({
                  message: "An error has occured.",
                  error: err,
               });
            }
         }
      }
   } catch (err) {
      console.log("err", err);
      return res
         .status(404)
         .json({ message: "Error fetching user.", error: err });
   }
};

