import { Application } from "express";
import {
	auth,
	authCbFailure,
	authCbSuccess,
	logInfo,
} from "../middlewares/google";

import passport from "passport";
export const googleAuth = (app: Application) => {
	app.get(
		"/auth/google",
		logInfo,
		passport.authenticate("google", {
			scope: ["profile"],
		})
	);
	app.get(
		"/auth/google/callback",
		logInfo,
		passport.authenticate("google", {
			failureRedirect: "/se-connecter",
			session: false,
		}),
		(req: any, res: any) => {
			const token = req.user.token;
			console.log("token :", token);
			res.redirect(`${process.env.HOST}/dashboard?token=${token}`);
		}
	);
};
