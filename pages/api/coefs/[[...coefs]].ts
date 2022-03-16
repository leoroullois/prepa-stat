import type { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "is-empty";
import {
	getCoefsByConcours,
	getCoefsByConcoursAndFiliere,
} from "@lib/coefs.middleware";
import { connectDB } from "@lib/db";
import { Coef } from "@models/Coef";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			if (isEmpty(req.query.coefs)) {
				try {
					console.log(`${req.method} ${req.url}`);
					const coefs = await Coef.find();
					if (!coefs) {
						return res.status(400).json({ message: "Coefs is empty." });
					}
					return res.status(200).json(coefs);
				} catch (err) {
					return res.status(400).json({ message: err });
				}
			} else if (req.query.coefs.length === 1) {
				return await getCoefsByConcours(req, res);
			} else if (req.query.coefs.length === 2) {
				return await getCoefsByConcoursAndFiliere(req, res);
			} else {
				return res.status(404).json({ message: "Wrong research" });
			}

		default:
			return res.status(500).json({ message: "Route not valid" });
	}
};
export default connectDB(handler);
