import { MouseEventHandler, FC, useState, useEffect } from "react";
import { logoutUser } from "../store/thunks/logout";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import jwt_decode from "jwt-decode";
interface IProps {
	auth: IAuth;
	logoutUser: any;
}
export const Presentational: FC<IProps> = ({ auth, logoutUser }) => {
	const [state, setState] = useState({
		name: auth.user.name,
	});
	useEffect(() => {
		if (!state.name) {
			const token = localStorage.jwtToken;
			const decoded: any = jwt_decode(token);
			if (decoded) {
				setState({
					...state,
					name: decoded.name,
				});
			}
		}
	}, [state]);

	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log("Se déconnecter");
		logoutUser();
	};
	return (
		<main>
			<h1>Bienvenue {state.name}. Vous êtes connectés !</h1>
			<button onClick={handleClick}>Se déconnecter</button>
		</main>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
	};
};
const dispatchToProps = {
	logoutUser,
};
export const Dashboard: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
