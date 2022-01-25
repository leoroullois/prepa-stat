import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Collection } from "mongodb";
import { Users } from "../../models/Users";
export const users = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router
		.route("/")
		.get((req: Request, res: Response) => {
			console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
			Users.findOne({ username: "leyo" })
				.then((user) => res.json(user))
				.catch((err) => console.error(err));
		})
		.post((req, res) => {
			const { email, password } = req.query;
			Users.create({ email, password })
				.then((user) => res.json(user))
				.catch((err) => console.error(err));
		});
};
