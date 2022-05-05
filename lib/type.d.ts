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
   note: string;
}
interface ModifyFormDataType {
   payload?: ICardBegin | IGrades[];
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
interface IAllFormData {
   params: ICardBegin;
   grades: IGrades[];
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
   classes_filles: number;
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
interface IToken {
   exp: number;
   iat: number;
   _id: string;
   email: string;
}
/** Register */
interface IRegisterForm {
   name: string;
   email: string;
   password1: string;
   password2: string;
}
interface ILoginForm {
   email: string;
   password: string;
   remember: boolean;
}
interface IError {
   message: string;
}
interface IValidator {
   errors: IError[];
   isValid: boolean;
}

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
interface IUser {
   _id: string;
   name: string;
   email: string;
   filiere: string;
}
interface IAuth {
   isAuthenticated: boolean;
   user: IUser;
   errors: string[];
   loading: boolean;
}
/**Errors */
interface IErrors {
   email?: string;
   name?: string;
   password?: string;
   password2?: string;
}

