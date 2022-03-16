import { Coef } from "@models/Coef";
import { NextApiRequest, NextApiResponse } from "next";

const allConcours = ["x-ens", "mines-pont", "centrale", "ccinp", "e3a"];
const allFiliere = ["mp", "pc", "psi", "pt"];

export const getAllCoefs = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	console.log(`${req.method} ${req.url}`);
	Coef.find()
		.then((coefs) => res.status(200).json(coefs))
		.catch((err) => res.status(400).json(err));
};
export const getCoefsByConcours = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	console.log(`${req.method} ${req.url}`);

	console.log("query :", req.query);
	const coefs = req.query.coefs as string[];
	const { 0: concours } = coefs;

	if (allConcours.includes(concours)) {
		Coef.find({ concours })
			.then((coefs) => res.status(200).json(coefs))
			.catch((err) => res.status(400).json(err));
	} else {
		return res
			.status(404)
			.json({ message: "No concours found in the url params." });
	}
};
export const getCoefsByConcoursAndFiliere = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	console.log(`${req.method} ${req.url}`);
	console.log("params :", req.query);
	const coefs = req.query.coefs as string[];
	const { 0: concours, 1: filiere } = coefs;
	if (allConcours.includes(concours) && allFiliere.includes(filiere)) {
		Coef.findOne({ concours, filiere })
			.then((doc) => res.status(200).json(doc))
			.catch((err) => res.status(400).json(err));
	} else {
		return res
			.status(400)
			.json({ message: "No concours or/and filiere found in the url params." });
	}
};
export const postCoefs = (req: NextApiRequest, res: NextApiResponse) => {
	console.log(`${req.method} /api/coefs${req.url}`);
	console.log(req.body);
	const { concours, filiere, epreuves } = req.body;
	if (concours && filiere && epreuves) {
		Coef.exists({ concours, filiere })
			.then((isPresent) => {
				if (!isPresent) {
					Coef.create({ ...req.body })
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
