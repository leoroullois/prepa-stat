import axios from "axios";
import { GET_ERRORS } from "../types";
import { setCurrentUser } from "../actions/loginAction";
import { AppDispatch } from "../store";
// Register User
export const registerUser =
	(userData: IRegisterState, navigate: any) => async (dispatch: AppDispatch) => {
		console.log("userDATA:", userData);
		axios({
			method: "post",
			url: "/s-enregistrer",
			data: JSON.stringify(userData),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				console.log("Successfully registered in.", res.data);
				navigate("/se-connecter");
				// dispatch(setCurrentUser(userData));
			})
			.catch((err) => {
				console.log("Error when registered.", err);
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				});
			});
	};
