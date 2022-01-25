import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import { Schools } from "../../models/Schools";
import { Users } from "../../models/Users";

export const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/hello", (req, res) => {
	console.log(`${req.method} /api/users${req.path} - ${req.ip}`);
    res.json();
});
