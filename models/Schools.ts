import mongoose, { Document } from "mongoose";

export interface ISchools extends Document {
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
	// annee: number;
	// filiere: string;
}
const SchoolsSchema = new mongoose.Schema({
	ecole: {
		type: String,
		required: true,
	},
	inscrits_nb: {
		type: Number,
		required: true,
	},
	inscrits_filles: {
		type: Number,
		required: true,
	},
	inscrits_cinq_demi: {
		type: Number,
		required: true,
	},
	admissibles_nb: {
		type: Number,
		required: true,
	},
	admissibles_filles: {
		type: Number,
		required: true,
	},
	admissibles_cinq_demi: {
		type: Number,
		required: true,
	},
	classes_nb: {
		type: Number,
		required: true,
	},
	casses_filles: {
		type: Number,
		required: true,
	},
	classes_cinq_demi: {
		type: Number,
		required: true,
	},
	integres_nb: {
		type: Number,
		required: true,
	},
	integres_filles: {
		type: Number,
		required: true,
	},
	integres_cinq_demi: {
		type: Number,
		required: true,
	},
	integres_rg_median: {
		type: Number,
		required: true,
	},
	integres_rg_moyen: {
		type: Number,
		required: true,
	},
	places: {
		type: Number,
		required: true,
	},
	// annee: {
	// 	type: Number,
	// 	required: true,
	// },
	// filiere: {
	// 	type: String,
	// 	required: true,
	// },
});

export const Schools = mongoose.model<ISchools>("schools", SchoolsSchema);
