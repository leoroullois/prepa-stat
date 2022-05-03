import { hashPassword, verifyPassword } from "@lib/auth";
import { connectDB } from "@lib/db";
import { Favorite } from "@models/Favorite";
import { IUser, User } from "@models/User";
import isEmpty from "is-empty";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

/**
 * GET the user
 * DELETE the user and his favorites
 * POST update the user with the provided body
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   console.log(req.method + " " + req.url);
   const { id } = req.query;
   switch (req.method) {
      case "GET":
         /**
          * GET the user (without favorites)
          */
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

      case "DELETE":
         /**
          * Delete the user and his favorites
          */
         try {
            const user = await User.findOneAndDelete({ _id: id });
            const favorites = await Favorite.findOneAndDelete({ _id: id });
            if (!user) {
               return res.status(404).json({ message: "Error fetching user." });
            }
            if (!favorites) {
               return res
                  .status(404)
                  .json({ message: "Error fetching favorites." });
            }
            return res.status(200).json({
               message: "User and his favorite schools have been deleted.",
               user,
               favorites,
            });
         } catch (err) {
            return res.status(404).json({ message: "Error fetching user." });
         }
      case "POST":
         /**
          * Update user with the provided body
          */
         console.log("BODY : ", req.body);
         try {
            const { name, filiere, pass } = req.body;
            const user = await User.findById(id);
            if (isEmpty(user)) {
               return res.status(404).json({ message: "User is empty." });
            } else {
               if (!isEmpty(pass)) {
                  const { currPassword, newPassword, confirmPassword } = pass;

                  const valid = await verifyPassword(
                     currPassword,
                     user.password
                  );
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
      default:
         return res.status(500).json({ message: "Route not valid" });
   }
};

export default connectDB(handler);

