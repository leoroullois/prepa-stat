import { SET_GRADES_STATE, SET_CARD_BEGIN_STATE } from "../types";

export interface IAction {
	type: string;
	payload: ICardBegin | IGrades;
}
export const setCardBeginState = (payload: ICardBegin): IAction => ({
	type: SET_CARD_BEGIN_STATE,
	payload,
});

export const setGradesState = (payload: IGrades): IAction => ({
	type: SET_GRADES_STATE,
	payload,
});
