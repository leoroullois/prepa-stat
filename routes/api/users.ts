import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { getUsersByName } from "../../middlewares/getUsersByName.middleware";
export const users = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.get("/:name", getUsersByName);
};
