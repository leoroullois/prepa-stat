import { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";
import {Landing} from "./Landing"
interface IProps {
	auth: any;
}
const Presentational: FC<IProps> = ({  auth }) => {
	return auth.isAuthenticated ?  <Navigate to='/dashboard' /> : <Landing />;
};
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
	};
};
export const Home: FC<any> = connect(mapStateToProps)(Presentational);
