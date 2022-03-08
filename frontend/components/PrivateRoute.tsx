import { useRouter } from "next/router";
import { FC, ReactComponentElement, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { selectAuth } from "../store/selectors";
import { RootState } from "../store/store";
interface IProps {
	component: ReactComponentElement<any, any>;
}
const PrivateRoute: FC<IProps> = ({ component }) => {
	const router = useRouter();
	const auth = useSelector(selectAuth);
	useEffect(() => {
		if (!auth.isAuthenticated) {
			router.push("/");
		}
	});
	return auth.isAuthenticated ? component : <div>Loading...</div>;
};
export default PrivateRoute;
