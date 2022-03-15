import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../store/selectors";
import { logout, setCurrentUser } from "../store/slices/auth";
import jwt_decode from "jwt-decode";
import { getJwtToken } from "../lib/auth";
import { useRouter } from "next/router";
import PrivateRoute from "../components/Auth/PrivateRoute";

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
				<main>
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
