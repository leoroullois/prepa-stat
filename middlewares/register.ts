import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { IUsers, Users } from "../models/Users";
import { Error } from "mongoose";
import { validateRegisterInput } from "../validators/register";
import { Request, Response } from "express";

export const register = (req: Request, res: Response, next: any) => {
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
};
