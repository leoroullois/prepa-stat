import { Application } from "express";
import {
	auth,
	authCbFailure,
	authCbSuccess,
	logInfo,
} from "../middlewares/github.middleware";

export const githubAuth = (app: Application) => {
	app.get("/auth/github", logInfo, auth);
	app.get("/auth/github/callback", logInfo, authCbFailure, authCbSuccess);

};
