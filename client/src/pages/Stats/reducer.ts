import { statsType } from "./action";
import { IState } from "./Stats";
import { DISPLAY_STAT } from "./type";

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
