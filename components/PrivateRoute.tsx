import { useRouter } from "next/router";
import { FC, ReactComponentElement, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { selectAuth } from "../store/selectors";
import { RootState } from "../store/store";
interface IProps {
	children: JSX.Element;
}
const PrivateRoute: FC<IProps> = ({ children }) => {
	const router = useRouter();
	const auth = useSelector(selectAuth);
	useEffect(() => {
		if (!auth.isAuthenticated) {
			router.push("/");
		}
	});
	return auth.isAuthenticated ? children : <div>Loading...</div>;
};
export default PrivateRoute;
