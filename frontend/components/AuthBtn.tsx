import { FC, MouseEventHandler } from "react";
import { logoutUser } from "../store/thunks/logout";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/router";

interface IProps {
	auth: IAuth;
	logoutUser: any;
}

const Presentational: FC<IProps> = ({ auth, logoutUser }) => {
	const router = useRouter();
	const darkRed = "rgb(160, 22, 22)";
	const darkBlue = "#255af8";
	const { isAuthenticated } = auth;
	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
		if (isAuthenticated) {
			console.log("Déconnexion");
			logoutUser();
		} else {
			router.push("/se-connecter");
		}
	};
	return (
		<button
			className='link btn-link'
			id='side-nav-auth-btn'
			style={{
				backgroundColor: isAuthenticated ? darkRed : darkBlue,
			}}
			onClick={handleClick}
		>
			{isAuthenticated ? "Se déconnecter" : "Se connecter"}
		</button>
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
export const AuthBtn: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
