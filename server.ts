import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { passportConfig } from "./config/passport";
import { join } from "path";

import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import { connectDb } from "./config/db";
import { users } from "./routes/api/users";
import { schools } from "./routes/api/schools";
import { authRoutes } from "./routes/users";
import { auth } from "./controllers/auth";
import { parseFile } from "./lib/parse";
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("build/build"));
app.use(
	session({
		secret: process.env.SESSION_SECRET || "",
		resave: true,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use(passport.initialize());
passportConfig(passport);
app.use(passport.session());

const postToDb = (year: number, cpge: string) => {
	const fileName = `${year}_${cpge}`;
	const inputPath = join(__dirname, `lib/${year}`);
	const parsedFile = parseFile(fileName, inputPath);
	for (const school of parsedFile) {
		fetch(`${process.env.PUBLIC_URL}:${PORT}/api/schools`, {
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
	app.get("/profile", (req, res) => {
		res.json({ message: "logged in" });
	});
	app.get("/*", (req: Request, res: Response) => {
		res.sendFile(join(__dirname, "./build/build/index.html"));
	});
	app.get("/api/hello", (req: Request, res: Response) => {
		res.send("Hello world");
	});
	// postToDb(2021, "pt");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`⚡️[server]: Server is running at ${process.env.PUBLIC_URL}:${PORT}`
	);
});
