import { setAuthToken } from "./../../utils/setAuthToken";
import { setCurrentUser } from "../actions/loginAction";
import { AppDispatch } from "../store";
// Log user out
export const logoutUser = () => (dispatch: AppDispatch) => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
