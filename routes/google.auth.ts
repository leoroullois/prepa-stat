import { Application } from "express";
import {
	auth,
	authCbFailure,
	authCbSuccess,
	logInfo,
} from "../middlewares/google.middleware";

export const googleAuth = (app: Application) => {
	app.get("/auth/google", logInfo, auth);
	app.get("/auth/google/callback", logInfo, authCbFailure, authCbSuccess);
};
