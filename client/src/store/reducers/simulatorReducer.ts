import { SET_GRADES, SET_PARAMS, BACK_GRADES } from "../types";
const init = (): ISimulState => {
	return {
		params: {
			concours: "",
			filiere: "",
			autre: {
				cinq_demi: false,
				lv2: false,
			},
		},
		grades: [],
	};
};
export const simulatorReducer = (state: ISimulState = init(), action: any) => {
	switch (action.type) {
		case SET_PARAMS:
			return {
				...state,
			};
		case SET_GRADES:
			return {
				...state,
			};
		case BACK_GRADES:
			return {
				...state,
			};
		default:
			return state;
	}
};
