type SchoolData = {
	ecole: string;
	classement: number;
	places: number;
	integres_rg_median: number;
	integres_rg_moyen: number;
	integres_cinq_demi: number;
	integres_filles: number;
	url: string;
	annee: number;
};
interface ISchoolCardProps {
	data: SchoolData;
	maxPlace: number;
}
