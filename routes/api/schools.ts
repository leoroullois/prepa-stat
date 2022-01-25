import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { Collection } from "mongodb";
import { parseAllFiles } from "../../lib/parse";
import path from "path";
export const schools = (router: Router) => {
	router.use(bodyParser.urlencoded({ extended: false }));
	router.use(express.json());
	router
		.route("/")
		.get((req: Request, res: Response) => {
			const { year, cpge } = req.query;
			if (year) {
				res.json({ year });
			}
			const parsedFiles = parseAllFiles(
				["2021_mp", "2021_pc", "2021_psi", "2021_pt"],
				path.join(__dirname, "../../lib/2021")
			);
			res.send(parsedFiles[1][0]);
		})
		.post((req: Request, res: Response) => {
			res.send({ test: "hello world" });
		});
};
