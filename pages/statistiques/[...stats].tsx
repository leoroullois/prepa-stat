import { FC, useEffect, useState } from "react";
/**CSS */
import scss from "../../scss/stats.module.scss";

/**Components */
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export interface IProps {
	params: {
		stats: string[];
	};
}

const Statistiques: FC<IProps> = ({ params }) => {
	const { 0: filiere, 1: section } = params.stats;
	return (
		<>
			<Head>
				<title>Statistiques {filiere.toUpperCase()} - PrépaStat</title>
			</Head>
			<main className={scss.stats}>
				<h1>Statistiques : filière {filiere}.</h1>
				<ul>
					<li>Filiere: {filiere}</li>
					<li>Section: {section}</li>
				</ul>
				{/* <header>
                <SubNav
                    links={[
                        "Générale",
                        "X",
                        "ENS",
                        "Centrale",
                        "Mines",
                        "CCINP",
                        "E3A",
                    ]}
                    path={"statistiques/" + filiere.toLowerCase()}
                    changeUrl={true}
                />
            </header>
            <div className='bar'></div>
            <StatsSection concours={concours} filiere={filiere} /> */}
			</main>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const filieres = ["mp", "pc", "pt", "psi"];
	const sections = [
		"generale",
		"x",
		"ens",
		"centrale",
		"mines",
		"ccinp",
		"e3a",
	];
	const paths = [];
	for (const filiere of filieres) {
		for (const section of sections) {
			paths.push({
				params: {
					stats: [filiere, section],
				},
			});
		}
	}
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	console.log(params);
	return {
		props: { params },
	};
};
export default Statistiques;
