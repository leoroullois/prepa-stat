import passport from "passport";
import mongoose from "mongoose";
import { IUsers, Users } from "../models/Users";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "../config/" });
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
	const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || "";
	const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || "";
	passport.use(
		new GoogleStrategy(
			{
				clientID: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/auth/google/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				console.log("Profile :", profile);
				Users.findOneAndUpdate(
					{ googleId: profile.id },
					{
						$setOnInsert: {
							id: profile.id,
							name: profile.displayName || "John Doe",
							// photo: profile.photos[0].value || "",
							email: Array.isArray(profile.emails)
								? profile.emails[0].value
								: "No public email",
							created_on: new Date(),
							provider: profile.provider || "",
						},
						$set: {
							last_login: new Date(),
						},
						$inc: {
							login_count: 1,
						},
					},
					{ upsert: true, new: true },
					(err: any, user: IUsers) => cb(err, user)
				);
			}
		)
	);
};
