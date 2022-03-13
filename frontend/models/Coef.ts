import mongoose, { Document } from "mongoose";
interface IEpreuves {
	nom: string;
	coef: number;
}
type EpreuvesType = IEpreuves[];
export interface ICoef extends Document {
	concours: string;
	filiere: string;
	epreuves: EpreuvesType;
}

const CoefSchema = new mongoose.Schema({
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
export const Coef =
	mongoose.models?.coefs || mongoose.model<ICoef>("coefs", CoefSchema);
