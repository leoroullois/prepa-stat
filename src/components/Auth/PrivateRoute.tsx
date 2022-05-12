import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";

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
