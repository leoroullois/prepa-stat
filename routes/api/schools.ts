import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import { Schools } from "../../models/Schools";

export const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
	console.log(`${req.method} /api/users - ${req.ip}`);
	res.json({ test: "Hello World" });
});
