import mongoose, { Document } from "mongoose";
export interface IUsers extends Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	name:string;
}

const UsersSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Types.ObjectId,
		require: true,
	},
	name: {
		type: String,
		required: true,
	},
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
