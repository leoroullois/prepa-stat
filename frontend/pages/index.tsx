import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Accueil - PrépaStat</title>
				<meta name='description' content='PrépaStat' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<main>
					<h1>
						Welcome to <a href='https://nextjs.org'>Next.js!</a>
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
						soluta sint nesciunt ratione similique, delectus perspiciatis
						assumenda dolorem inventore exercitationem cupiditate dolore totam
						molestias autem! Hic neque ad maiores tempore.
					</p>
				</main>
			</Layout>
		</>
	);
};

export default Home;
