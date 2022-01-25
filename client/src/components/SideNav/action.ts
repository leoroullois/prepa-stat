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
