// pages/api/spotify.js
import { ObjectId } from "mongodb";
import nc from "next-connect";
import passport from "passport";
import { connectDB } from "../../../lib/db";
// pages/api/spotify.js
import { User } from "../../../models/User";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// Saves user's ID to a session
passport.serializeUser((user, done) => {
	done(null, user);
});
// Retrieve user's ID from a session
passport.deserializeUser((id: string, done) => {
	User.findOne({ _id: new ObjectId(id) }, (err: any, user: any) => {
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
			callbackURL: `${process.env.HOST}/api/auth/callback/google`,
		},
		function (
			accessToken: any,
			refreshToken: any,
			expires_in: any,
			profile: any,
			cb: any
		) {
			console.log("Profile :", profile);
			User.findOneAndUpdate(
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
const handler = nc().get(
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

export default connectDB(handler);
