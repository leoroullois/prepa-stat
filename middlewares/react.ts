import { Request, Response } from "express";
import { join } from "path";

export const react = (req: Request, res: Response) => {
	res.sendFile(join(__dirname, "./build/build/index.html"));
};
