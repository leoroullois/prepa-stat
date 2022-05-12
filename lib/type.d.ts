import { UserTypeId } from "@backend/models/User";

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

/**JWT Token */
interface IToken {
   exp: number;
   iat: number;
   _id: string;
   user_type_id: UserTypeId;
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

