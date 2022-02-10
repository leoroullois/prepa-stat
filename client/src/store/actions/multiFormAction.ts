import { SET_MULTIFORM_STATE } from "../types";

export interface IAction {
	type: string;
	payload: ICardBegin | IGrades;
}
export const setMultiFormState = (payload: ICardBegin | IGrades): IAction => ({
	type: SET_MULTIFORM_STATE,
	payload,
});
