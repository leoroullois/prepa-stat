import passport from "passport";
import mongoose from "mongoose";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
import { IUsers, Users } from "../models/Users";
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
		Users.findOne({ _id: new ObjectId(id) }, (err: any, user: any) => {
			if (err) {
				return done(err);
			}
			done(null, user);
		});
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
			},
			function (accessToken: any, refreshToken: any, profile: any, cb: any) {
				console.log("Profile :", profile);
				Users.findOneAndUpdate(
					{ googleId: profile.id },
					{
						$setOnInsert: {
							id: new ObjectId(),
							googleId: profile.id,
							name: profile.displayName || "John Doe",
							photo: profile.photos[0].value || "",
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
					(err: any, user: any) => {
						if (err) {
							throw err;
						}
						cb(err, user);
					}
				);
			}
		)
	);
	passport.use(
		new GitHubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
			},
			function (accessToken: any, refreshToken: any, profile: any, cb: any) {
				console.log("Profile :", profile);
				Users.findOneAndUpdate(
					{ githubId: profile.id },
					{
						$setOnInsert: {
							id: new ObjectId(),
							githubId: profile.id,
							name: profile.displayName || "John Doe",
							photo: profile.photos[0].value || "",
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
					(err, user: any) => {
						if (err) {
							throw err;
						}
						return cb(null, user);
					}
				);
			}
		)
	);
};
