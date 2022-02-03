import { Request, Response } from "express";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({ path: "../config" });
export const react = (req: Request, res: Response) => {
	if (process.env.NODE_ENV === "production") {
		res.sendFile(join(__dirname, "../../client/build/200.html"));
	} else {
		res.sendFile(join(__dirname, "../client/build/200.html"));
	}
};
