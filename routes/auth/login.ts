import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";

export const login = (router:Router) => {
    router.use(bodyParser.urlencoded({ extended: false }));
	router.use(express.json());
}