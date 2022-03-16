import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Landing from "@components/Landing/Landing";
import { selectAuth } from "@store/selectors";

const Home: NextPage = () => {
	const auth = useSelector(selectAuth);
	const router = useRouter();
	useEffect(() => {
		if (auth.isAuthenticated) {
			router.push("/dashboard");
		}
	});
	return (
		<>
			<Head>
				<title>Accueil - PrépaStat</title>
				<meta name='description' content='PrépaStat' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{auth.isAuthenticated ? <div>Loading...</div> : <Landing />}
		</>
	);
};

export default Home;
