import validator from "validator";
import isEmpty from "is-empty";

import pbkdf2 from "pbkdf2";
import { lib } from "crypto-js";

import { compare, hash } from "bcrypt";

export async function hashPassword(password: string) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}
export async function verifyPassword(password: string, hashedPassword: string) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}

export const validateRegisterInput = (data: IRegisterForm): IValidator => {
	let errors: IError[] = [];
	// ? Convert empty fields to an empty string so we can use validator functions
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password1 = !isEmpty(data.password1) ? data.password1 : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	// Name check
	if (validator.isEmpty(data.name)) {
		errors.push({ message: "Name field is required." });
	}

	// Email checks
	if (validator.isEmpty(data.email)) {
		errors.push({ message: "Email field is required." });
	} else if (!validator.isEmail(data.email)) {
		errors.push({ message: "Email is invalid." });
	}

	// Password checks
	if (validator.isEmpty(data.password1)) {
		errors.push({ message: "Password field is required." });
	}
	if (validator.isEmpty(data.password2)) {
		errors.push({ message: "Confirm password field is required." });
	}
	if (!validator.isLength(data.password1, { min: 8, max: 32 })) {
		errors.push({ message: "Password must be at least 8 characters." });
	}
	if (!validator.equals(data.password1, data.password2)) {
		errors.push({ message: "Passwords must match" });
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};

export const validateLoginInput = (data: ILoginForm): IValidator => {
	let errors: IError[] = [];
	// ? Convert empty fields to an empty string so we can use validator functions
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.remember = !isEmpty(data.remember) ? data.remember : false;

	if (validator.isEmpty(data.email)) {
		errors.push({ message: "Username field is required." });
	}
	if (validator.isEmpty(data.password)) {
		errors.push({ message: "Password field is required" });
	}
	return {
		errors,
		isValid: isEmpty(errors),
	};
};
// export const useJwtToken = () => {
// 	const dispatch = useDispatch();
// 	const [token, setToken] = useState(
// 		jwtDecode(localStorage.getItem("jwtToken") as string) as any
// 	);
// 	useEffect(() => {
// 		setToken(jwtDecode(localStorage.getItem("jwtToken") as string) as string);
// 	}, [token]);
// 	return [token, isExpired];
// };
export const getJwtToken = (): string => {
	return localStorage.getItem("jwtToken") ?? "";
};
export const removeJwtToken = (): void => {
	localStorage.removeItem("jwtToken");
};
export const setJwtToken = (token: any): void => {
	localStorage.setItem("jwtToken", token);
};
// export const isJwtExpired = (token: string): boolean => {
// 	if (isEmpty(token)) {
// 		return false;
// 	}

// 	const decoded = jwt_decode(token) as any;
// 	// Check for expired token
// 	const currentTime = Date.now() / 1000; // to get in milliseconds

// 	return decoded.exp < currentTime;
// };
// export const keepLoggedIn = (store: any) => {
// 	// Check for token to keep user logged in
// 	if (localStorage.jwtToken) {
// 		// Set auth token header auth
// 		const token = localStorage.jwtToken;
// 		// Decode token and get user info and exp
// 		const decoded: any = jwt_decode(token);
// 		console.log("DECODED TOKEN : ", decoded);
// 		// Set user and isAuthenticated
// 		store.dispatch(
// 			setCurrentUser({
// 				email: decoded.email,
// 				id: decoded.id,
// 				name: decoded.name,
// 			})
// 		);
// 		// Check for expired token
// 		const currentTime = Date.now() / 1000; // to get in milliseconds
// 		if (decoded.exp < currentTime) {
// 			// Logout user
// 			localStorage.removeItem("jwtToken");
// 			store.dispatch(logout());
// 			// Redirect to login
// 			Router.push("/login");
// 		}
// 	}
// };

const salt = lib.WordArray.random(128 / 8).toString();

const getKey = (salt: string, password: string): string => {
	const iterations = 1e1;
	const keylen = 256;
	const res = pbkdf2.pbkdf2Sync(password, salt, iterations, keylen, "sha512");
	console.log("RES : ", res.toString("hex"));
	return res.toString("hex");
};
