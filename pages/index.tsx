import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Landing from "../components/Landing/Landing";
import scss from "../components/Landing/landing.module.scss";
import { selectAuth } from "../store/selectors";

const Home: NextPage = () => {
	const auth = useSelector(selectAuth);
	const router = useRouter();
	useEffect(() => {
		if (auth.isAuthenticated) {
			router.push("/dashboard");
		}
	});
	const home = (
		<main className={scss.landing}>
			<h1>
				Welcome to <a href='https://nextjs.org'>Next.js!</a>
			</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi soluta
				sint nesciunt ratione similique, delectus perspiciatis assumenda dolorem
				inventore exercitationem cupiditate dolore totam molestias autem! Hic
				neque ad maiores tempore.
			</p>
		</main>
	);
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
