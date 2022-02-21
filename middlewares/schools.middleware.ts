import { NextFunction, Request, Response } from "express";
import { Schools } from "../models/Schools";
const filieres = ["mp", "pc", "psi", "pt"];
const concours = [
	"concours_ecole_polytechnique",
	"banque_ens",
	"banque_centrale_supelec",
	"concours_commun_mines_ponts",
	"concours_mines_télécom",
	"concours_commun_inp",
	"banque_epreuves_ccinp_inter_filière",
	"banque_epreuves_ccinp",
	"concours_polytech_inter_filière",
	"puissance_alpha",
	"avenir_prépas",
	"fesic",
	"autres_écoles_e3a",
	"groupe_insa",
	"cesi",
	"epita",
];

export const getAllSchools = (req: Request, res: Response) => {
	Schools.find({})
		.then((schools) => res.json(schools))
		.catch((err) => console.error(err));
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

export const getSchools1 = async (req: Request, res: Response) => {
	const { id1 } = req.params;
	if (filieres.includes(id1)) {
		const schools = await Schools.find({ filiere: id1 });
		res.json(schools);
	} else if (concours.includes(id1)) {
		const schools = await Schools.find({ concours: id1 });
		res.json(schools);
	} else if (!Number.isNaN(Number(id1))) {
		const schools = await Schools.find({ annee: id1 });
		res.json(schools);
	} else {
		res.json({ error: "Wrong research" });
	}
};
export const getSchools2 = async (req: Request, res: Response) => {
	const { id1, id2 } = req.params;
	const match: any = {};
	// * match id1
	if (filieres.includes(id1)) {
		match.filiere = id1;
	} else if (concours.includes(id1)) {
		match.concours = id1;
	} else if (!Number.isNaN(Number(id1))) {
		match.annee = id1;
	} else {
		return res.json({ error: "Wrong research" });
	}
	// * match id2
	if (filieres.includes(id2)) {
		match.filiere = id2;
	} else if (concours.includes(id2)) {
		match.concours = id2;
	} else if (!Number.isNaN(Number(id2))) {
		match.annee = id2;
	} else {
		return res.json({ error: "Wrong research" });
	}
	console.log(match);
	const schools = await Schools.find(match);
	return res.json(schools);
};
export const getSchools3 = async (req: Request, res: Response) => {
	const { id1, id2, id3 } = req.params;
	const match: any = {};
	// * match id1
	if (filieres.includes(id1)) {
		match.filiere = id1;
	} else if (concours.includes(id1)) {
		match.concours = id1;
	} else if (!Number.isNaN(Number(id1))) {
		match.annee = id1;
	} else {
		return res.json({ error: "Wrong research" });
	}
	// * match id2
	if (filieres.includes(id2)) {
		match.filiere = id2;
	} else if (concours.includes(id2)) {
		match.concours = id2;
	} else if (!Number.isNaN(Number(id2))) {
		match.annee = id2;
	} else {
		return res.json({ error: "Wrong research" });
	}
	// * match id3
	if (filieres.includes(id3)) {
		match.filiere = id3;
	} else if (concours.includes(id3)) {
		match.concours = id3;
	} else if (!Number.isNaN(Number(id3))) {
		match.annee = id3;
	} else {
		return res.json({ error: "Wrong research" });
	}
	console.log(match);
	const schools = await Schools.find(match);
	return res.json(schools);
};
