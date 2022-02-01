import { Users } from "../models/Users";
import { Request, Response } from "express";
export const getUsersByName = (req: Request, res: Response) => {
	console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
	Users.find({ name: req.params.name })
		.then((user) => res.json(user))
		.catch((err) => console.error(err));
};
