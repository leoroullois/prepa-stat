import Controller from "./types";
import mongoose from "mongoose";
import {
   hashPassword,
   validateRegisterInput,
   validateLoginInput,
   verifyPassword,
} from "@lib/auth";
import { User, UserTypeId } from "backend/models/User";
import isEmpty from "is-empty";
import { Favorite } from "backend/models/Favorite";
import jwt from "jsonwebtoken";
import { removeNullValuesFromObject } from "@backend/utils";

export const checkIfEmailExists: Controller = async (req, res, next) => {
   const { email } = req.body;
   try {
      const checkExistingEmail = await User.findOne({ email });
      if (isEmpty(checkExistingEmail)) {
         return next();
      }
      return res.status(422).json({ message: "Email is already used" });
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};
export const validateUserRegister: Controller = async (req, res, next) => {
   const valid = validateRegisterInput(req.body);

   if (valid.isValid) {
      return next();
   }
   return res.status(401).json({
      message: "Invalid input",
      error: valid.errors,
   });
};

export const registerNewUser: Controller = async (req, res) => {
   const { email, name, filiere, password1 } = req.body;
   const id = new mongoose.Types.ObjectId();
   try {
      const status = await User.create({
         _id: id,
         email,
         name,
         filiere,
         user_type_id: UserTypeId.Customer,
         password: await hashPassword(password1),
      });
      const initFavs = await Favorite.create({
         _id: id,
         favorites: [],
      });
      const user = removeNullValuesFromObject({
         ...status._doc,
         password: null,
      });
      return res.status(201).json({
         message: "User created",
         user: user,
      });
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

export const validateUserLogin: Controller = async (req, res, next) => {
   const valid = validateLoginInput(req.body);

   if (valid.isValid) {
      return next();
   }
   return res.status(401).json({
      message: "Invalid input",
      error: valid.errors,
   });
};
export const loginUser: Controller = async (req, res) => {
   const { email, password, remember } = req.body;
   try {
      const user = await User.findOne({ email });
      if (isEmpty(user)) {
         return res.status(404).json({ message: "User not found." });
      } else if (await verifyPassword(password, user.password)) {
         const payload = {
            _id: user._id,
            email: user.email,
         };
         const token = jwt.sign(payload, process.env.JWT_KEY as string, {
            expiresIn: remember ? 31556926 : 0, // one year in seconds
         });
         res.setHeader("Authorization", ("Bearer " + token) as string);

         const myUser = removeNullValuesFromObject({
            ...user._doc,
            password: null,
         });
         return res.status(201).json({
            message: "User logged in.",
            token: "Bearer " + token,
            user: myUser,
         });
      } else {
         return res.status(401).json({ message: "Password is incorrect." });
      }
   } catch (err) {
      return res
         .status(400)
         .json({ message: "An error has occured.", error: err });
   }
};

