import express, { Router } from "express";
import bodyParser from "body-parser";
import {
	getAllSchools,
	getSchools1,
	getSchools2,
	getSchools3,
	postSchools,
} from "../../middlewares/schools.middleware";

// * 3 paramètres : année, filière, concours
export const schools = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.use(express.json());
	router.route("/").get(getAllSchools).post(postSchools);
	router.get("/:id1", getSchools1);
	router.get("/:id1/:id2", getSchools2);
	router.get("/:id1/:id2/:id3", getSchools3);
};
