import { SET_CURRENT_USER, USER_LOADING } from "./type";
import isEmpty from "is-empty";

const init = () => {
	return {
		isAuthenticated: false,
		user: {},
		loading: false,
	};
};

export const authReducer = (state = init(), action: any) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
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
