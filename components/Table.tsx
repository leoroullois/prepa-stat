import React, { MouseEventHandler, useEffect, useState } from "react";
import {
	Heading,
	Skeleton,
	Tab,
	Table as ChakraTable,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { ISchool } from "../models/School";
import { useRouter } from "next/router";
const Table = () => {
	const [schools, setSchools] = useState<ISchool[]>();

	const router = useRouter();
	const params = router.query.stats as string[];
	const { 0: filiere, 1: section } = params;

	useEffect(() => {
		fetch(`/api/schools/${filiere}/concours_ecole_polytechnique`)
			.then((res) => res.json())
			.then((data) => {
				setSchools(data);
				console.log("updated schools :", data);
			});
	}, [filiere]);
	const handleOver: MouseEventHandler = (e) => {
		console.log(e);
	};
	return (
		<ChakraTable size='md'>
			<Thead>
				<Tr>
					{Object.keys(schools?.[0] ?? {})
						.filter(
							(elt) =>
								elt === "ecole" ||
								elt === "inscrits_nb" ||
								elt === "admissibles_nb" ||
								elt === "integres_nb" ||
								elt === "places"
						)
						.map((key, i) => (
							<Th key={i}>{key}</Th>
						))}
				</Tr>
			</Thead>
			<Tbody>
				{schools
					?.filter((school) => school.annee === 2021)
					.map((school, i) => {
						return (
							<Tr key={i} onMouseOver={handleOver}>
								{Object.entries(school)
									.filter((elt) => {
										const [key, value] = elt;
										return (
											key == "ecole" ||
											key == "inscrits_nb" ||
											key == "admissibles_nb" ||
											key === "integres_nb" ||
											key === "places"
										);
									})
									.map((elt, i) => (
										<Td key={i}>{elt[1]}</Td>
									))}
							</Tr>
						);
					})}
			</Tbody>
			<Tfoot>
				<Tr>
					{Object.keys(schools?.[0] ?? {})
						.filter(
							(elt) =>
								elt == "ecole" ||
								elt == "inscrits_nb" ||
								elt == "admissibles_nb" ||
								elt === "integres_nb" ||
								elt === "places"
						)
						.map((key, i) => (
							<Th key={i}>{key}</Th>
						))}
				</Tr>
			</Tfoot>
		</ChakraTable>
	);
};

export default Table;
