import { ISideNavState } from "./SideNav";
import { CLOSE_SIDE_NAV, OPEN_SIDE_NAV } from "./type";
import { toggleType } from "./action";

const init = (): ISideNavState => {
	return {
		opened: false,
	};
};
export const sideNavReducer = (
	state: ISideNavState = init(),
	action: toggleType
) => {
	switch (action.type) {
		case CLOSE_SIDE_NAV:
			return { ...state, opened: false };
		case OPEN_SIDE_NAV:
			return { ...state, opened: true };
		default:
			return { ...state };
	}
};
