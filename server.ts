import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
const fetch = require("node-fetch");

dotenv.config({ path: "./config/.env" });
import { passportConfig } from "./config/passport";
import { connectDb } from "./config/db";

import { users } from "./routes/api/users";
import { schools } from "./routes/api/schools";

import { auth } from "./controllers/auth.controller";
import { react } from "./middlewares/react.middleware";
import { jwtAuth } from "./routes/jwt.auth";
import { googleAuth } from "./routes/google.auth";
import { githubAuth } from "./routes/github.auth";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("build/build"));

app.use(
	session({
		secret: "Our little secret.",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

connectDb(async () => {
	/**
	 * ! Users API endpoint
	 */
	console.log("⚡️[MongoDB]: Successfully connected to the collection users.");
	const usersRouter = express.Router();
	usersRouter.use(bodyParser.urlencoded({ extended: false }));
	app.use("/api/users", usersRouter);
	users(usersRouter);
	/**
	 * ! Schools API endpoint
	 */
	console.log(
		"⚡️[MongoDB]: Successfully connected to the collection schools."
	);
	const schoolsRouter = express.Router();
	app.use("/api/schools", schoolsRouter);
	schools(schoolsRouter);
	/**
	 * ! Auth API endpoint
	 */
	const authRouter = express.Router();
	app.use("/", authRouter);
	//  ? Auth routes : /se-connecter, /s-enregistrer, 
	jwtAuth(authRouter);
	// ? Login with google
	googleAuth(app);
	// ? Login with github
	githubAuth(app);
	// ? Authentification controller
	auth();
	/**
	 * ! React
	 */
	app.get("/*", react);
	// postToDb(2021, "pt");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
