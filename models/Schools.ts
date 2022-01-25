import mongoose from "mongoose";

const SchoolsSchema = new mongoose.Schema({
	ecole: String,
	inscrits_nb: Number,
	inscrits_filles: Number,
	inscrits_cinq_demi: Number,
	admissibles_nb: Number,
	admissibles_filles: Number,
	admissibles_cinq_demi: Number,
	classes_nb: Number,
	casses_filles: Number,
	classes_cinq_demi: Number,
	integres_nb: Number,
	integres_filles: Number,
	integres_cinq_demi: Number,
	integres_rg_median: Number,
	integres_rg_moyen: Number,
	places: Number,
	annee: Number,
	filiere: String,
});

export const Schools = mongoose.model("schools",SchoolsSchema);