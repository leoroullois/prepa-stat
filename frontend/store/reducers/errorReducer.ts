import { GET_ERRORS } from "../types";
const init = (): IErrors => {
	return {
		email: "",
		name: "",
		password: "",
		password2: "",
	};
};
export const errorReducer = (state: IErrors = init(), action: any) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
