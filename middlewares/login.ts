import jwt from "jsonwebtoken";
import { validateLoginInput } from "./../validators/login";
import { Request, Response } from "express";
import { Users } from "../models/Users";
import bcrypt from "bcrypt";

export const login = (req: Request, res: Response, next: any) => {
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
};
