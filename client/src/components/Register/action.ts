import {
	REGISTER_WRITE_USERNAME,
    REGISTER_WRITE_EMAIL,
	REGISTER_WRITE_PASSWORD,
    REGISTER_SUBMIT
} from "./type";

export interface IUsernameAction {
	type: string;
    input:string;
}
export interface IEmailAction {
	type: string;
	input: string;
}
export interface IPasswordAction {
	type: string;
	input: string;
}
export interface ISubmitAction {
    type:string;
}

export const usernameAction = (pInput:string): IUsernameAction => {
	return {
		type: REGISTER_WRITE_USERNAME,
        input:pInput,
	};
};
export const emailAction = (pInput: string): IEmailAction => {
	return {
		type: REGISTER_WRITE_EMAIL,
		input: pInput,
	};
};
export const passwordAction = (pInput: string): IPasswordAction => {
	return {
		type: REGISTER_WRITE_PASSWORD,
		input: pInput,
	};
};
export const submitAction = (): ISubmitAction => {
	return {
		type: REGISTER_SUBMIT,
	};
};
