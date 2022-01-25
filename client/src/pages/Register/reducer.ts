import { IRegisterState } from "./Register";
import {
	IUsernameAction,
	IEmailAction,
	IPasswordAction,
	ISubmitAction,
} from "./action";
import {
	REGISTER_WRITE_USERNAME,
	REGISTER_WRITE_EMAIL,
	REGISTER_WRITE_PASSWORD,
	REGISTER_SUBMIT,
} from "./type";
const init = (): IRegisterState => {
	return {
		email: "",
		password: "",
		username: "",
	};
};
type LoginActionsType =
	| IUsernameAction
	| IEmailAction
	| IPasswordAction
	| ISubmitAction;
export const registerReducer = (
	state: IRegisterState = init(),
	action: LoginActionsType
): IRegisterState => {
	switch (action.type) {
		case REGISTER_WRITE_USERNAME:
            const vActionUsername = action as IUsernameAction;
			return {
				...state,
				username: vActionUsername.input,
			} as IRegisterState;
		case REGISTER_WRITE_PASSWORD:
			const vActionPassword = action as IPasswordAction;
			return {
				...state,
				password: vActionPassword.input,
			} as IRegisterState;
		case REGISTER_WRITE_EMAIL:
			const vActionEmail = action as IEmailAction;
			return {
				...state,
				email: vActionEmail.input,
			} as IRegisterState;
        case REGISTER_SUBMIT:
            // TODO: créer la vérification des différents champs
            return {
                ...state
            }
		default:
			return state;
	}
};
