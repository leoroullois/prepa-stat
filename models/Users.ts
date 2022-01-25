import mongoose, { Document } from "mongoose";
export interface IUsers extends Document {
    email: string;
    password: string;
}

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

export const Users = mongoose.model<IUsers>("users", UsersSchema);
