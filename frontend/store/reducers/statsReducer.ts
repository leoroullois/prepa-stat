import { statsType } from "../actions/statsAction";
import { IState } from "../../pages/Stats";
import { DISPLAY_STAT } from "../types";

const defaultState: IState = { data: [], w: 800, h: 600 };
export const statsReducer = (
	state = defaultState,
	action: statsType
): IState => {
	switch (action.type) {
		case DISPLAY_STAT:
			return { ...state };

		default:
			return state;
	}
};
