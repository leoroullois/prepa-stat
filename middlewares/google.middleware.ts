import { Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AES } from "crypto-js";

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
			expiresIn: 0,
		},
		(err, token) => {
			console.log("Token jwt ", token);
			console.log("Email :", req.user.email);
			const encToken = AES.encrypt(
				JSON.stringify(`${token}`),
				`${process.env.SESSION_SECRET}`
			).toString();
			const encEmail = AES.encrypt(
				JSON.stringify(req.user.email),
				`${process.env.SESSION_SECRET}`
			).toString();
			res.redirect(
				`${process.env.PUBLIC_URL}/redirect?email=${encodeURIComponent(
					encEmail
				)}&token=${encodeURIComponent(encToken)}`
			);
		}
	);
};
