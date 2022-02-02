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
	PUBLIC_URL:string;
	SERVER_URL:string;
}
interface IAuth {
	isAuthenticated: boolean;
	user: any;
	loading: boolean;
	urls:IUrls;
}
/**Errors */
interface IErrors {
	email?: string;
	name?: string;
	password?: string;
	password2?: string;
}
