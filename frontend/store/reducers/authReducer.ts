import { SET_CURRENT_USER, USER_LOADING } from "../types";
import isEmpty from "is-empty";

const init = (): IAuth => {
	const PUBLIC_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://prepa-stat.herokuapp.com";
	const SERVER_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000"
			: "https://prepa-stat.herokuapp.com";
	return {
		isAuthenticated: false,
		user: {},
		loading: false,
		urls: {
			PUBLIC_URL,
			SERVER_URL,
		},
	};
};

export const authReducer = (state = init(), action: any) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: { ...action.payload, password: null },
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
