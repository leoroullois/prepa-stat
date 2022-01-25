import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const Users = mongoose.model("users",UsersSchema);