import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { login } from "../middlewares/login.middleware";
import { register } from "../middlewares/register.middleware";
dotenv.config({ path: "../config" });

export const jwtAuth = (router: Router) => {
	router.post("/se-connecter", login);
	router.post("/s-enregistrer", register);
};
