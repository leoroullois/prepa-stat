import { Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../config" });
export const logInfo = (req: Request, res: Response, next: any) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
};
export const auth = passport.authenticate("github");
export const authCbFailure = passport.authenticate("github", {
	failureRedirect: "/se-connecter",
});
export const authCbSuccess = (req: any, res: any) => {
	console.log("User :", req);
	const payload = {
		id: req.user.githubId,
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
			res.redirect(
				`${process.env.PUBLIC_URL}/redirect?email=${req.user.email}&token=${token}`
			);
		}
	);
};
