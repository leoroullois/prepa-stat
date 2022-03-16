import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import slugify from "slugify";
import scss from "@scss/stats.module.scss";

import {
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import Table from "@components/Table";

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
		router.push(newUrl, undefined, { shallow: true });
		setTabIndex(index);
	};

	return (
		<>
			<Head>
				<title>Statistiques {filiere.toUpperCase()} - PrépaStat</title>
			</Head>
			<main className={scss.stats}>
				<Heading as='h1' marginY={10}>
					Statistiques {filiere.toUpperCase()}.
				</Heading>
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
								<Heading as='h2' size='md' textAlign='center' marginY={5}>
									{tab}
								</Heading>
								<Heading as='h3' size='sm'>
									Statistiques de base.
								</Heading>
								<Table />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	return {
		props: { params },
	};
};

export default Statistiques;
