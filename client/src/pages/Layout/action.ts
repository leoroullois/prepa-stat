import { closeAction } from "./../../components/SideNav/action";
import { dropdownStatAction } from "./../../components/NavBar/action";
import { WINDOW_RESIZE } from "./type";
export interface IWindowResize {
	type: string;
	width: number;
	height: number;
}
export const resizeAction = (
	pWidth: number,
	pHeight: number
): IWindowResize => {
	return {
		type: WINDOW_RESIZE,
		width: pWidth,
		height: pHeight,
	};
};
// reset: (pValue: boolean) => dispatch(dropdownStatAction(pValue)),
// 		resize: (pWidth: number, pHeight: number) =>
// 			dispatch(resizeAction(pWidth, pHeight)),
// 		close: () => dispatch(closeAction()),

export const reset = (pValue: boolean) => (dispatch: any) => {
	dispatch(dropdownStatAction(pValue));
};

export const resize = (pWidth: number, pHeight: number) => (dispatch: any) => {
	dispatch(resizeAction(pWidth, pHeight));
};

export const close = () => (dispatch: any) => {
	dispatch(closeAction());
};
