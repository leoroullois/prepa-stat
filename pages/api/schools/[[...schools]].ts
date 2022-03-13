import { getAllSchools } from "../../../lib/schools.middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/db";
import {
	getSchools1,
	getSchools2,
	getSchools3,
} from "../../../lib/schools.middleware";
import isEmpty from "is-empty";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log("query", req.query);
	switch (req.method) {
		case "GET":
			if (isEmpty(req.query)) {
				return await getAllSchools(req, res);
			} else if (req.query.schools.length === 1) {
				return await getSchools1(req, res);
			} else if (req.query.schools.length === 2) {
				return await getSchools2(req, res);
			} else if (req.query.schools.length === 3) {
				return await getSchools3(req, res);
			} else {
				return res.status(404).json({ message: "Wrong research." });
			}

		default:
			return res.status(500).json({ message: "Route not valid" });
	}
};
export default connectDB(handler);
