import { WINDOW_RESIZE } from "../types";
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