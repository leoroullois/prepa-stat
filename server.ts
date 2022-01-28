import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";

import { join } from "path";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import { connectDb } from "./config/db";
import { users } from "./routes/api/users";
import { schools } from "./routes/api/schools";
import { login } from "./routes/auth/login";
import { register } from "./routes/auth/register";
import { parseFile } from "./lib/parse";
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("client/build"));

const postToDb = (year: number, cpge: string) => {
	const fileName = `${year}_${cpge}`;
	const inputPath = join(__dirname, `lib/${year}`);
	const parsedFile = parseFile(fileName, inputPath);
	for (const school of parsedFile) {
		fetch(`http://localhost:5000/api/schools`, {
			method: "post",
			body: JSON.stringify(school),
			headers: { "Content-Type": "application/json" },
		})
			.then((res: any) =>
				res.json({ status: "Successfully posted to the db." })
			)
			.then((data: any) => console.log(data));
	}
};
connectDb(async () => {
	/**
	 * Users API endpoint
	 */
	console.log("⚡️[MongoDB]: Successfully connected to the collection users.");
	const usersRouter = express.Router();
	app.use("/api/users", usersRouter);
	users(usersRouter);
	/**
	 * Schools API endpoint
	 */
	console.log(
		"⚡️[MongoDB]: Successfully connected to the collection schools."
	);
	const schoolsRouter = express.Router();
	app.use("/api/schools", schoolsRouter);
	schools(schoolsRouter);
	/**	
	 * Auth API endpoint
	 */
	const loginRouter = express.Router();
	app.use("/auth/login",loginRouter);
	login(loginRouter);

	const registerRouter = express.Router();
	app.use("/auth/register",registerRouter);
	register(registerRouter);

	/**
	 * React
	 */
	app.get("/*", (req: Request, res: Response) => {
		res.sendFile(join(__dirname, "./client/build/index.html"));
	});

	// postToDb(2021, "pt");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
