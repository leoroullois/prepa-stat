import { ObjectId } from "mongoose";
import { Coefs } from "../models/Coefs";
import { Request, Response } from "express";

const allConcours = ["x-ens", "mines-pont", "centrale", "ccinp", "e3a"];
const allFiliere = ["mp", "pc", "psi", "pt"];

export const getAllCoefs = (req: Request, res: Response) => {
	console.log(`${req.method} /api/coefs${req.path} - ${req.ip}`);
	Coefs.find()
		.then((coefs) => res.json(coefs))
		.catch((err) => console.error(err));
};
export const getCoefsByConcours = (req: Request, res: Response) => {
	console.log(`${req.method} /api/coefs${req.path} - ${req.ip}`);
	console.log("params :", req.params);
	const { concours } = req.params;
	if (allConcours.includes(concours)) {
		Coefs.find({ concours })
			.then((coefs) => res.json(coefs))
			.catch((err) => console.error(err));
	} else {
		return console.error("No concours found in the url params.");
	}
};
export const getCoefsByConcoursAndFiliere = (req: Request, res: Response) => {
	console.log(`${req.method} /api/coefs${req.path} - ${req.ip}`);
	console.log("params :", req.params);
	const { concours, filiere } = req.params;
	if (allConcours.includes(concours) && allFiliere.includes(filiere)) {
		Coefs.findOne({ concours, filiere })
			.then((doc) => res.json(doc))
			.catch((err) => console.error(err));
	} else {
		throw new Error("No concours or/and filiere found in the url params.");
	}
};
export const postCoefs = (req: Request, res: Response) => {
	console.log(`${req.method} /api/coefs${req.path} - ${req.ip}`);
	console.log(req.body);
	const { concours, filiere, epreuves } = req.body;
	if (concours && filiere && epreuves) {
		Coefs.exists({ concours, filiere })
			.then((isPresent) => {
				if (!isPresent) {
					Coefs.create({ ...req.body })
						.then((doc) => res.json(doc))
						.catch((err) => console.error(err));
				}
				return console.log("Coefs already exists in the database.");
			})
			.catch((err) => console.error(err));
	} else {
		return console.error("Can't post damaged data to the database.");
	}
};
