import { Request, Response } from "express";
import { Schools } from "../models/Schools";
export const getSchools = (req: Request, res: Response) => {
	const { annee, filiere } = req.query;
	if (annee && filiere) {
		Schools.find({ annee, filiere })
			.then((schools) => res.json(schools))
			.catch((err) => console.error(err));
	} else if (annee) {
		Schools.find({ annee })
			.then((schools) => res.json(schools))
			.catch((err) => console.error(err));
	} else if (filiere) {
		Schools.find({ filiere })
			.then((schools) => res.json(schools))
			.catch((err) => console.error(err));
	} else {
		Schools.find({})
			.then((schools) => res.json(schools))
			.catch((err) => console.error(err));
	}
};
export const postSchools = (req: Request, res: Response) => {
	const school = req.body;
	Schools.exists(school)
		.then((exist) => {
			if (exist) {
				return console.log("This school is already in the db");
			}
			Schools.create(school)
				.then((mySchool) => res.json(mySchool))
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
};
