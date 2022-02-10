import mongoose, { Document } from "mongoose";
interface IEpreuves {
	nom: string;
	coef: number;
}
type EpreuvesType = IEpreuves[];
export interface ICoefs extends Document {
	concours: string;
	filiere: string;
	epreuves: EpreuvesType;
}

const CoefsSchema = new mongoose.Schema({
	concours: {
		type: String,
		require: true,
	},
	filiere: {
		type: String,
		require: true,
	},
	epreuves: {
		type: Array,
		require: true,
	},
});

export const Coefs = mongoose.model<ICoefs>("coefs", CoefsSchema);
