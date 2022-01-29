import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import bcrypt from "bcrypt";
import { IUsers, Users } from "../models/Users";
import { Error } from "mongoose";

export const authRoutes = (router: Router) => {
	const ensureAuthentification = (req: Request, res: Response, next: any) => {
		if (req.isAuthenticated()) {
			next();
		}
		res.redirect("/");
	};

	router.post(
		"/se-connecter",
		passport.authenticate("local", {
			failureRedirect: "/se-connecter",
		}),
		(req: Request, res: Response) => {
			console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
			res.redirect("/profile");
		}
	);
	router.post(
		"/s-enregistrer",
		(req: Request, res: Response, next: any) => {
			console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
			Users.findOne({ email: req.body.email }, (err: Error, user: IUsers) => {
				if (err) {
					next(err, null);
				} else if (user) {
					res.redirect("/");
				} else {
					const hash = bcrypt.genSalt(12, (err, salt) => {
						if (err) {
							throw err;
						}
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							if (err) throw err;
							Users.create({
								email: req.body.email,
								password: hash,
							})
								.then((doc) => {
									next(null, doc);
								})
								.catch((err) => {
									res.redirect("/s-enregistrer");
								});
						});
					});
				}
			});
		},
		passport.authenticate("local", {
			failureRedirect: "/s-enregistrer",
		}),
		(req, res, next) => {
			res.send("/profile");
		}
	);
	router.get(
		"/profile",
		ensureAuthentification,
		(req: Request, res: Response) => {
			console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
			res.json({ message: "Profile page ?" });
		}
	);
	router.get("/se-deconnecter", (req: Request, res: Response) => {
		console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
		req.logout();
		res.redirect("/");
	});
};
