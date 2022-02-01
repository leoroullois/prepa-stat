import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { login } from "../middlewares/login";
import { register } from "../middlewares/register";
dotenv.config({ path: "../config" });

export const authRoutes = (router: Router) => {
	router.post("/se-connecter", login);
	router.post("/s-enregistrer", register);
};
