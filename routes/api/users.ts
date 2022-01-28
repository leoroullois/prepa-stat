import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Users } from "../../models/Users";
export const users = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.get("/", (req: Request, res: Response) => {
		console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
		Users.findOne({ username: "leyo" })
			.then((user) => res.json(user))
			.catch((err) => console.error(err));
	});
};
