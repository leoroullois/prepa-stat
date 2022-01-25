import express, { Request, response, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/db";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import { Collection, Db } from "mongodb";
import { users } from "./routes/api/users";
import { schools } from "./routes/api/schools";

const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("client/build"));

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
	 * React
	 */
	app.get("/*", (req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, "./client/build/index.html"));
	});
	const response = fetch("http://localhost:5000/api/users?email=admin&password=admin", {
		method: "post",
		headers: { "Content-Type": "application/json" },
	})
		.then((res: any) => res.json())
		.then((data: any) => console.log(data));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
