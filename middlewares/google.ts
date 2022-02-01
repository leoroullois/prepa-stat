import { Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config({path:"../config"})
export const logInfo = (req: Request, res: Response, next: any) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
};
export const auth = passport.authenticate("google", {
	scope: ["profile", "email"],
});
export const authCbFailure = passport.authenticate("google", {
	failureRedirect: "/se-connecter",
	session: false,
});
export const authCbSuccess = (req: any, res: any) => {
	const token = req.user.token;
	console.log("token :", token)
	res.redirect(`${process.env.HOST}/dashboard?token=${token}`);
};
