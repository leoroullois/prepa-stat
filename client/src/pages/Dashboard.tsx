import { FC, useState, useEffect } from "react";
import { logoutUser } from "../store/thunks/logout";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import jwt_decode from "jwt-decode";
import "../css/dashboard.css";



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

	

	return (
		<main id='dashboard'>
			<h1>Bienvenue {state.name}. Vous êtes connectés !</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis tenetur
				nostrum accusantium quisquam quidem, quos inventore cumque culpa velit
				ab assumenda beatae neque voluptatibus et quia? Accusamus quos veritatis
				nostrum.
			</p>
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
