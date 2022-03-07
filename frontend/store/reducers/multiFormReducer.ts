import { IAction } from "./../actions/multiFormAction";
import { SET_CARD_BEGIN_STATE, SET_GRADES_STATE } from "../types";
const init = () => {
	return {
		params: {
			concours: "",
			filiere: "",
			cinq_demi: false,
			lv2: false,
		},
		grades: [],
	};
};

export const multiFormReducer = (
	state = init(),
	{ type, payload }: IAction
) => {
	switch (type) {
		case SET_CARD_BEGIN_STATE:
			return { ...state, params: payload };
		case SET_GRADES_STATE:
			return { ...state, grades: payload };
		default:
			return state;
	}
};
