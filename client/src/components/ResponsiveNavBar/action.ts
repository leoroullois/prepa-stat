import { CLOSE_RES_NAVBAR, OPEN_RES_NAVBAR } from "./type";
export interface toggleType {
	type: string;
}
export const openAction = () => {
	return {
		type: OPEN_RES_NAVBAR,
	};
};
export const closeAction = () => {
	return {
		type: CLOSE_RES_NAVBAR,
	};
};
