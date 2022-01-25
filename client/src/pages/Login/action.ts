import {
	LOGIN_REMEMBER,
	LOGIN_WRITE_EMAIL,
	LOGIN_WRITE_PASSWORD,
} from "./type";

export interface IRememberAction {
	type: string;
}
export interface IEmailAction {
	type: string;
	input: string;
}
export interface IPasswordAction {
	type: string;
	input: string;
}
export const rememberAction = (): IRememberAction => {
	return {
		type: LOGIN_REMEMBER,
	};
};
export const emailAction = (pInput: string): IEmailAction => {
	return {
		type: LOGIN_WRITE_EMAIL,
		input: pInput,
	};
};
export const passwordAction = (pInput: string): IPasswordAction => {
	return {
		type: LOGIN_WRITE_PASSWORD,
		input: pInput,
	};
};
