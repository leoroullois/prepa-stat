import { FC, MouseEventHandler, useEffect, useState } from "react";
/**CSS */
import scss from "../../scss/stats.module.scss";
import slugify from "slugify";

/**Components */
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Statistiques: FC = () => {
	const router = useRouter();
	const params = router.query.stats as string[];
	const { 0: filiere, 1: section } = params;

	const allTabs = ["Générale", "X", "ENS", "Centrale", "Mines", "CCINP", "E3A"];
	const paths = router.query.stats as string[];

	const [tabIndex, setTabIndex] = useState(
		allTabs.map((elt) => slugify(elt).toLowerCase()).indexOf(paths[1])
	);

	const handleTabsChange = (index: number) => {
		const slugifiedTabs = allTabs.map((tab) => slugify(tab).toLowerCase());
		const paths = router.query.stats as string[];
		const baseUrl = "/statistiques/" + paths[0];
		const concours = slugifiedTabs[index];
		const newUrl = baseUrl + "/" + concours;
		// router.push(newUrl);
		router.push(newUrl, undefined, { shallow: true });
		setTabIndex(index);
	};

	return (
		<>
			<Head>
				<title>Statistiques {filiere.toUpperCase()} - PrépaStat</title>
			</Head>
			<main className={scss.stats}>
				<Heading as='h1'>Statistiques {filiere.toUpperCase()}.</Heading>
				<Tabs
					index={tabIndex}
					onChange={handleTabsChange}
					size='lg'
					variant='enclosed'
					colorScheme='orange'
				>
					<TabList>
						{allTabs.map((tab, i) => (
							<Tab key={i}>{tab}</Tab>
						))}
					</TabList>
					<TabPanels>
						{allTabs.map((tab, i) => (
							<TabPanel key={i}>
								<h2>{tab}</h2>
								<p>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
									labore sapiente mollitia culpa nesciunt cumque unde, dolorum
									animi possimus pariatur nemo aut dolorem rem magnam ea iure
									porro sunt repellat?
								</p>
								<ul>
									<li>Filiere: {filiere}</li>
									<li>Section: {section}</li>
								</ul>
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
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
export default Statistiques;
