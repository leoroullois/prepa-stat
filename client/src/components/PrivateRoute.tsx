import { FC, ReactComponentElement } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
interface IProps {
	component: ReactComponentElement<any, any>;
	auth: any;
}
const Presentational: FC<IProps> = ({ component, auth }) => {
	return auth.isAuthenticated ? component : <Navigate to='/' />;
};
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
	};
};
export const PrivateRoute: FC<any> = connect(mapStateToProps)(Presentational);
