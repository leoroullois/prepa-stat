import { IResponsiveNavBarState } from "./ResponsiveNavBar";
import { CLOSE_RES_NAVBAR, OPEN_RES_NAVBAR } from "./type";
import { toggleType } from "./action";

const init = (): IResponsiveNavBarState => {
	return {
		opened: false,
	};
};
export const resNavBarReducer = (
	state: IResponsiveNavBarState = init(),
	action: toggleType
) => {
	switch (action.type) {
		case CLOSE_RES_NAVBAR:
			return { ...state, opened: false };
		case OPEN_RES_NAVBAR:
			return { ...state, opened: true };
		default:
			return { ...state };
	}
};
