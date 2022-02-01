import { parseFile } from "../lib/parse";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config();
export const postToDb = (year: number, cpge: string) => {
	const fileName = `${year}_${cpge}`;
	const inputPath = join(__dirname, `lib/${year}`);
	const parsedFile = parseFile(fileName, inputPath);
	for (const school of parsedFile) {
		fetch(
			`${process.env.PUBLIC_URL}:${process.env.PORT || "5000"}/api/schools`,
			{
				method: "post",
				body: JSON.stringify(school),
				headers: { "Content-Type": "application/json" },
			}
		)
			.then((res: any) =>
				res.json({ status: "Successfully posted to the db." })
			)
			.then((data: any) => console.log(data));
	}
};
