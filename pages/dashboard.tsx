import { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { logout } from "@store/slices/auth";
import PrivateRoute from "@components/Auth/PrivateRoute";
import scss from "@scss/dashboard.module.scss";

const Dashboard: NextPage = () => {
	const dispatch = useDispatch();
	const auth = useSelector(selectAuth);

	const handleLogout: MouseEventHandler = () => {
		dispatch(logout());
	};
	return (
		<>
			<Head>
				<title>Dashboard - PrépaStat</title>
			</Head>
			<PrivateRoute>
				<main className={scss["dashboard"]}>
					<h1>Dashboard</h1>
					<h2>Welcome back {JSON.stringify(auth.user)}</h2>
					{/* <h3>Token {JSON.stringify(token)}</h3> */}
					<button onClick={handleLogout}>Se déconnecter</button>
				</main>
			</PrivateRoute>
		</>
	);
};

// export const getStaticProps: GetStaticProps = async () => {
// 	return {
// 		props: {
// 			name: localStorage.getItem("jwtToken"),
// 		},
// 	};
// };

export default Dashboard;
