import { logoutUser } from "../auth/action";
import { connect } from "react-redux";
import { MouseEventHandler } from "react";
export const Presentational = (props: any) => {
	const handleLogout: MouseEventHandler = (e) => {
		props.logoutUser();
	};
	const { name } = props;
	return (
		<main id='dashboard'>
			<h1>Hello {name}</h1>
			<h2>You are logged in !</h2>
			<button onClick={handleLogout}>Se déconnecter</button>
		</main>
	);
};

const mapStateToProps = (state: any) => ({
	auth: state.auth,
});
const dispatchToProps = {
	logoutUser,
};
export const Dashboard = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
