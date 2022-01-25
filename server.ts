import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/db";
import path from "path";
import dotenv from "dotenv";
import { router as schools } from "./routes/api/schools";
dotenv.config({ path: "./config/.env" });

const app = express();
connectDb();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("client/build"));

app.get("/", (req: any, res: any) => res.send("Express + TypeScript Server"));
app.get("/api/hello", (_req: any, res: any) => {
	res.json({ text: "Hello API !" });
});

app.use("/api/schools", schools);

app.get("/*", (req: any, res: any) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
