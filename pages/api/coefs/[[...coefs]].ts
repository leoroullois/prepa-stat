import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";
import {
	getAllCoefs,
	getCoefsByConcours,
	getCoefsByConcoursAndFiliere,
} from "../../../lib/coefs.middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			if (req.query.coefs.length === 1) {
				return await getAllCoefs(req, res);
			} else if (req.query.coefs.length === 2) {
				return await getCoefsByConcours(req, res);
			} else if (req.query.coefs.length === 3) {
				return await getCoefsByConcoursAndFiliere(req, res);
			} else {
				return res.status(404).json({ message: "Wrong research" });
			}

		default:
			return res.status(500).json({ message: "Route not valid" });
	}
};
export default connectDB(handler);
