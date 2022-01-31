import { ObjectId } from "mongodb";
import { Router, Request, Response } from "express";
import passport, { use } from "passport";
import bcrypt from "bcrypt";
import { IUsers, Users } from "../models/Users";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { validateRegisterInput } from "../validators/register";
import { validateLoginInput } from "./../validators/login";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config({ path: "../config" });

export const authRoutes = (router: Router) => {
	const ensureAuthentification = (req: Request, res: Response, next: any) => {
		if (req.isAuthenticated()) {
			console.log("Already authenticated");
			next();
		}
		console.log("redirecting to /");
		res.redirect("/");
	};

	router.post("/se-connecter", (req, res, next) => {
		console.log(`${req.method} ${req.path} - ${req.ip}`);
		console.log("BODY : ", req.body);
		//form validation
		console.log("VALIDATION :", validateLoginInput(req.body));
		const { errors, isValid } = validateLoginInput(req.body);
		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const { email, password, remember } = req.body;
		// Find user by email
		Users.findOne({ email }).then((user) => {
			if (!user) {
				return res.status(404).json({ emailnotfound: "Email not found" });
			}
			// Check password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					// User matched, create JWT payload
					const payload = {
						id: user._id,
						name: user.name,
					};
					// Sign token
					jwt.sign(
						payload,
						process.env.SESSION_SECRET || "secret",
						{
							expiresIn: remember ? 31556926 : 0, // one year in seconds
						},
						(err, token) => {
							res.json({
								success: true,
								token: "Bearer " + token,
							});
						}
					);
				} else {
					return res
						.status(400)
						.json({ passwordincorrect: "Password incorrect" });
				}
			});
		});
	});
	router.post("/s-enregistrer", (req: Request, res: Response, next: any) => {
		console.log(`${req.method} ${req.path} - ${req.ip}`);
		console.log("BODY :", req.body);
		// Form validation
		const { errors, isValid } = validateRegisterInput(req.body);
		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Users.findOne({ email: req.body.email }, (err: Error, user: IUsers) => {
			if (err) {
				next(err, null);
			} else if (user) {
				return res.status(400).json({ email: "Email already exists." });
			} else {
				bcrypt.genSalt(10, (err, salt) => {
					if (err) {
						throw err;
					}
					bcrypt.hash(req.body.password, salt, (err, hash) => {
						if (err) throw err;
						Users.create({
							_id: new ObjectId(),
							name: req.body.name,
							email: req.body.email,
							password: hash,
						})
							.then((user) => {
								res.json(user);
								// return res.redirect("/se-connecter");
							})
							.catch((err) => console.error(err));
					});
				});
			}
		});
	});
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
