/**Simulator */
interface ICardBegin {
	concours: string;
	filiere: string;
	cinq_demi: boolean;
	lv2: boolean;
}
interface IGrades {
	epreuve: string;
	coef: number;
	note: number;
}
interface ModifyFormDataType {
	payload?: ICardBegin | IGrades;
	prop: string | null;
}
interface ISetGrades {
	type: string;
	payload: IGrades[];
}
interface ISetParams {
	type: string;
	payload: ISimulInfo;
}
/**Schools */
interface ISchools {
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
/**JWT Token */
interface IDecodedUser {
	exp?: number;
	iat?: number;
	id: string;
	name: string;
}
/** Register */
interface IRegisterState {
	name: string;
	email: string;
	password: string;
	password2: string;
}
// ? Redux
type RegisterAction = {
	type: string;
	payload: any;
};
type DispatchType = (args: RegisterAction) => RegisterAction;

/** Login */
interface ILoginState {
	email: string;
	password: string;
	remember: boolean;
}
interface ILoginProps {
	loginUser?: any;
	auth: any;
	errors: any;
}

/**Auth */
interface IUrls {
	PUBLIC_URL: string;
	SERVER_URL: string;
}
interface IAuth {
	isAuthenticated: boolean;
	user: any;
	loading: boolean;
	urls: IUrls;
}
/**Errors */
interface IErrors {
	email?: string;
	name?: string;
	password?: string;
	password2?: string;
}
