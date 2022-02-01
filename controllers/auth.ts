import passport from "passport";
import mongoose from "mongoose";
import { IUsers, Users } from "../models/Users";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
declare global {
	namespace Express {
		interface User {
			email: string;
			password: string;
			_id?: mongoose.Types.ObjectId;
		}
	}
}

export const auth = () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id: string, done) => {
		Users.findOne({ _id: new ObjectId(id) }, (err: any, user: IUsers) => {
			if (err) {
				return done(err);
			}
			done(null, user);
		});
	});
};
