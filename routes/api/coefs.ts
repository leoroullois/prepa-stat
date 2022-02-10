import { Router, json } from "express";
import bodyParser from "body-parser";
import {
	getAllCoefs,
    getCoefsByConcours,
	getCoefsByConcoursAndFiliere,
    postCoefs
} from "../../middlewares/coefs.middleware";
export const coefs = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.use(json());
	router.route("/").get(getAllCoefs).post(postCoefs);
	router.get("/:concours", getCoefsByConcours);
    router.get("/:concours/:filiere", getCoefsByConcoursAndFiliere);
};
