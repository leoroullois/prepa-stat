import mongoDB, { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { callbackify } from "util";
dotenv.config();

export const connectDb = async (callback: () => Promise<void>) => {
	try {
		await mongoose.connect(process.env.MONGO_URI || "");
		console.log("⚡️[MongoDB]: MongoDB is connected.");
		await callback();
	} catch (e) {
		console.error("⚡️[MongoDB]: Failed to connect to mongoDB\n", e);
		process.exit(1);
	}
};
