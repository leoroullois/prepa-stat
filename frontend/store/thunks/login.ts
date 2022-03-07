import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "../actions/loginAction";
import { GET_ERRORS } from "../types";
import { AppDispatch } from "../store";

// Login - get user token
export const loginUser =
	(userData: ILoginState) => async (dispatch: AppDispatch) => {
		axios({
			method: "post",
			url: "/se-connecter",
			data: JSON.stringify(userData),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				// Save to localStorage
				// Set token to localStorage
				console.log("res :",res)
				const { token } = res.data;
				localStorage.setItem("jwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				const decoded = jwt_decode(token);
				// Set current user
				dispatch(setCurrentUser(decoded));
				dispatch(setCurrentUser(userData));
			})
			.catch((err) => {
				console.log("Error when logging.", err);
				return dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	};
