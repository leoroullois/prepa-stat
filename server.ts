import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./config/passport";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import { connectDb } from "./config/db";
import { users } from "./routes/api/users";
import { schools } from "./routes/api/schools";
import { authRoutes } from "./routes/users";
import { auth } from "./controllers/auth";

import { react } from "./middlewares/react";
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("build/build"));

app.use(passport.initialize());
passportConfig(passport);

connectDb(async () => {
	/**
	 * Users API endpoint
	 */
	console.log("⚡️[MongoDB]: Successfully connected to the collection users.");
	const usersRouter = express.Router();
	usersRouter.use(bodyParser.urlencoded({ extended: false }));
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
	const authRouter = express.Router();
	app.use("/", authRouter);
	authRoutes(authRouter);
	auth();

	/**
	 * React
	 */
	app.get("/*", react);
	// postToDb(2021, "pt");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`⚡️[server]: Server is running at ${process.env.PUBLIC_URL}:${PORT}`
	);
});
