import { CLOSE_SIDE_NAV, OPEN_SIDE_NAV } from "../types";
import { toggleType } from "../actions/sideNavAction";
interface IState {
	opened: boolean;
}
const init = (): IState => {
	return {
		opened: false,
	};
};
export const sideNavReducer = (state: IState = init(), action: toggleType) => {
	switch (action.type) {
		case CLOSE_SIDE_NAV:
			return { ...state, opened: false };
		case OPEN_SIDE_NAV:
			return { ...state, opened: true };
		default:
			return { ...state };
	}
};
