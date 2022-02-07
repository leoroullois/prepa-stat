import { SET_GRADES, SET_PARAMS, BACK_GRADES } from "../types";
export const setGrades = (payload: IGrades[]): ISetGrades => {
	return {
		type: SET_GRADES,
		payload,
	};
};
export const setParams = (payload: ISimulInfo): ISetParams => {
	return {
		type: SET_PARAMS,
		payload,
	};
};
export const goBack = () => {
	return {
		type: BACK_GRADES,
	};
};
