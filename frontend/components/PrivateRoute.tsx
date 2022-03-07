import { useRouter } from "next/router";
import { FC, ReactComponentElement, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store";
interface IProps {
	component: ReactComponentElement<any, any>;
	auth: any;
}
const Presentational: FC<IProps> = ({ component, auth }) => {
	const router = useRouter();
	useEffect(() => {
		if (!auth.isAuthenticated) {
			router.push("/");
		}
	});
	return auth.isAuthenticated ? component : <div>Loading...</div>;
};
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
	};
};
export const PrivateRoute: FC<any> = connect(mapStateToProps)(Presentational);
