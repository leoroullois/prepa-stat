import { IAction } from "./../actions/multiFormAction";
import { SET_MULTIFORM_STATE } from "../types";
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
		case SET_MULTIFORM_STATE:
			return { ...state, ...payload };

		default:
			return state;
	}
};
