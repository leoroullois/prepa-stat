import { Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../config" });
export const logInfo = (req: Request, res: Response, next: any) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
};
export const auth = passport.authenticate("google", {
	scope: ["profile", "email"],
});
export const authCbFailure = passport.authenticate("google", {
	failureRedirect: "/se-connecter",
	session: false,
});
export const authCbSuccess = (req: any, res: any) => {
	console.log("User :", req);
	const payload = {
		id: req.user.googleId,
		name: req.user.name,
	};
	console.log("Payload :", payload);
	// Sign token
	jwt.sign(
		payload,
		`${process.env.SESSION_SECRET}`,
		{
			expiresIn: 31556926, // one year in seconds
		},
		(err, token) => {
			console.log("Bearer ", token);
			res.redirect(
				`${process.env.PUBLIC_URL}/redirect?email=${req.email}&token=${token}`
			);
		}
	);
};
