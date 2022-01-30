import { GET_ERRORS } from "./type";
const initialState = {};
export const errorReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};
