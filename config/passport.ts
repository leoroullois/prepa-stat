import mongoose from "mongoose";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import { Users } from "../models/Users";
import dotenv from "dotenv";
dotenv.config();
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jsonWebTokenOptions: {
		ignoreExpiration: false,
	},
	secretOrKey: process.env.SESSION_SECRET || "secret",
	algorithms: ["HS256"],
};
export const passportConfig = (passport: any) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload: any, done: any) => {
			Users.findById(jwt_payload.id)
				.then((user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err) => console.log(err));
		})
	);
};
