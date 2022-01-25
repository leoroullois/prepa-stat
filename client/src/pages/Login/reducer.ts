import {ILoginState} from "./Login";
import { IRememberAction,IEmailAction,IPasswordAction } from "./action";
import { LOGIN_REMEMBER,LOGIN_WRITE_EMAIL,LOGIN_WRITE_PASSWORD } from "./type";
const init = ():ILoginState => {
    return {
        email:"",
        password:"",
        remember:false,
    }
}
type LoginActionsType = IRememberAction | IEmailAction | IPasswordAction;
export const loginReducer = (state:ILoginState=init(),action:LoginActionsType):ILoginState => {
    switch (action.type) {
        case LOGIN_REMEMBER:
            return {
                ...state,
                remember: !state.remember,
            } as ILoginState;
        case LOGIN_WRITE_PASSWORD:
            const vActionPassword=action as IPasswordAction;
            return {
                ...state,
                password:vActionPassword.input,
            } as ILoginState;
        case LOGIN_WRITE_EMAIL:
            const vActionEmail=action as IEmailAction;
            return {
                ...state,
                email:vActionEmail.input,
            } as ILoginState;
        default:
            return state;
    }
}