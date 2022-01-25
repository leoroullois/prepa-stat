import mongoose from "mongoose";

export const connectDb = async () => {
	const URI = process.env.MONGO_URI || "" as string;
	try {
		await mongoose.connect(URI);
		console.log("⚡️[MongoDB]: MongoDB is connected.");
	} catch (err) {
		return console.log("Failed to connect to MongoDB.", err);
	}
};
