import { parseFile } from "../lib/parse";
import { join } from "path";
import dotenv from "dotenv";
const fetch = require("node-fetch");
dotenv.config();
export const postCoefs = () => {
	const coefs = [
		{
			concours: "ccinp",
			filiere: "mp",
			epreuves: [
				{
					nom: "Mathématiques 1",
					coef: 12,
				},
				{
					nom: "Physique-Chimie",
					coef: 7,
				},
				{
					nom: "Mathématiques 2",
					coef: 12,
				},
				{
					nom: "Français-Philo",
					coef: 9,
				},
				{
					nom: "Physique",
					coef: 7,
				},
				{
					nom: "LV1",
					coef: 4,
				},
				{
					nom: "LV2",
					coef: 2,
				},
				{
					nom: "Informatique ou Sciences Industrielles",
					coef: 7,
				},
			],
		},
		{
			concours: "ccinp",
			filiere: "psi",
			epreuves: [
				{
					nom: "Mathématiques 1",
					coef: 120,
				},
				{
					nom: "Physique-Chimie",
					coef: 7,
				},
				{
					nom: "Mathématiques 2",
					coef: 12,
				},
				{
					nom: "Français-Philo",
					coef: 9,
				},
				{
					nom: "Physique",
					coef: 7,
				},
				{
					nom: "LV1",
					coef: 4,
				},
				{
					nom: "LV2",
					coef: 2,
				},
				{
					nom: "Informatique ou Sciences Industrielles",
					coef: 7,
				},
			],
		},
	];
	for (const coef of coefs) {
		fetch(`${process.env.SERVER_URL}/api/coefs`, {
			method: "post",
			body: JSON.stringify(coef),
			headers: { "Content-Type": "application/json" },
		})
			.then((res: any) =>
				res.json({ status: "Successfully posted to the db." })
			)
			.then((data: any) => console.log(data));
	}
};
