import { chooseAction } from "../SubNav/action";
import { CLOSE_SIDE_NAV, OPEN_SIDE_NAV } from "./type";
export interface toggleType {
	type: string;
}
export const openAction = () => {
	return {
		type: OPEN_SIDE_NAV,
	};
};
export const closeAction = () => {
	return {
		type: CLOSE_SIDE_NAV,
	};
};

// export const resetSubNav = (pNewSection: string, pClasses: string[], pPage: string) =>
// 			dispatch(chooseAction(pNewSection, pClasses, pPage)),
// 		close: () => dispatch(closeAction()),

export const resetSubNav =
	(pNewSection: string, pClasses: string[], pPage: string) =>
	(dispatch: any) => {
		dispatch(chooseAction(pNewSection, pClasses, pPage));
	};
export const close = () => (dispatch: any) => {
	dispatch(closeAction());
};
