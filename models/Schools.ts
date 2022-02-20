import mongoose, { Document } from "mongoose";

export interface ISchools extends Document {
	concours: string;
	ecole: string;
	inscrits_nb: number;
	inscrits_filles: number;
	inscrits_cinq_demi: number;
	admissibles_nb: number;
	admissibles_filles: number;
	admissibles_cinq_demi: number;
	classes_nb: number;
	casses_filles: number;
	classes_cinq_demi: number;
	integres_nb: number;
	integres_filles: number;
	integres_cinq_demi: number;
	integres_rg_median: number;
	integres_rg_moyen: number;
	places: number;
	annee: number;
	filiere: string;
}
const SchoolsSchema = new mongoose.Schema({
	concours: {
		type: String,
		required: true,
	},
	ecole: {
		type: String,
		required: true,
	},
	inscrits_nb: {
		type: Number,
	},
	inscrits_filles: {
		type: Number,
	},
	inscrits_cinq_demi: {
		type: Number,
	},
	admissibles_nb: {
		type: Number,
	},
	admissibles_filles: {
		type: Number,
	},
	admissibles_cinq_demi: {
		type: Number,
	},
	classes_nb: {
		type: Number,
	},
	casses_filles: {
		type: Number,
	},
	classes_cinq_demi: {
		type: Number,
	},
	integres_nb: {
		type: Number,
	},
	integres_filles: {
		type: Number,
	},
	integres_cinq_demi: {
		type: Number,
	},
	integres_rg_median: {
		type: Number,
	},
	integres_rg_moyen: {
		type: Number,
	},
	places: {
		type: Number,
	},
	annee: {
		type: Number,
		require: true,
	},
	filiere: {
		type: String,
		require: true,
	},
});

export const Schools = mongoose.model<ISchools>("schools", SchoolsSchema);
