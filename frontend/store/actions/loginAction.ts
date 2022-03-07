import { SET_CURRENT_USER } from "../types";
import { USER_LOADING } from "../types";
// Set logged in user
export const setCurrentUser = (decoded: any) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};