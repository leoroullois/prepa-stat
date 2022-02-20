import express, { Router } from "express";
import bodyParser from "body-parser";
import { getSchools, postSchools } from "../../middlewares/schools.middleware";

export const schools = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.use(express.json());
	router.route("/").get(getSchools).post(postSchools);
};
