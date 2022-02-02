import { FC, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCurrentUser } from "../store/actions/loginAction";
import { loginUser } from "../store/thunks/login";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
interface IProps {
	loginUser: any;
}
export const Presentational: FC<IProps> = ({ loginUser }) => {
	const navigate = useNavigate();
    const dispatch= useDispatch();
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const token = searchParams.get("token");
        const email = searchParams.get("email");
        if(token && email) {
            localStorage.setItem("jwtToken", token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				const decoded = jwt_decode(token);
				// Set current user
				dispatch(setCurrentUser(decoded));
				dispatch(setCurrentUser({email}));
                navigate("/dashboard");
        }
	});
	return (
		<h1 style={{ height: "100%" }}>
			Vous allez être redirigé automatiquement...
		</h1>
	);
};
const dispatchToProps = {
	loginUser,
};

export const AuthRedirect: FC<{}> = connect(
	null,
	dispatchToProps
)(Presentational);
