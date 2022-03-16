import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Button,
	Heading,
	Skeleton,
	Stack,
	Table as ChakraTable,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { ISchool } from "@models/School";
import SchoolCard from "./SchoolCard";
import scss from "./table.module.scss";
import { getConcours } from "@lib/statistiques";
import { useSelector } from "react-redux";
import { selectSchools } from "@store/selectors";

import { matchConcours } from "@lib/statistiques";

const Table = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const router = useRouter();
	const params = router.query.stats as string[];
	const [currentSchool, setCurrentSchool] = useState<ISchool>();
	const { 0: filiere, 1: concours } = params;
	const schools = useSelector(selectSchools);

	const handleMouseEnter: MouseEventHandler<HTMLTableRowElement> = (e) => {
		const row = e.currentTarget;
		setCurrentSchool(
			schools?.filter(
				(school) => school.ecole === row.firstChild?.textContent
			)[0]
		);
	};
	useEffect(() => {
		console.log("param ",concours);
	},[concours])
	const addEmptyProperties = (school: any): ISchool => {
		let mySchool: any = school;
		const allKeys = [
			"ecole",
			"inscrits_nb",
			"admissibles_nb",
			"integres_nb",
			"places",
		];
		allKeys.forEach((key) => {
			if (!mySchool.hasOwnProperty(key)) {
				mySchool = {
					...mySchool,
					[key]: "-",
				};
			}
		});
		return mySchool;
	};
	if (!!!schools) {
		const skeletons = [];
		for (let i = 0; i < 20; i++) {
			skeletons.push(<Skeleton height='40px' width='50vw' />);
		}
		return (
			<Stack spacing={5} marginTop={10}>
				{skeletons}
			</Stack>
		);
	}
	return (
		<>
			{matchConcours(concours).map((currConcours) => {
				const currSchools = schools
					?.filter((school) => school.concours === currConcours)
					.filter(
						(school) =>
							school.ecole !== currConcours || school.ecole.includes("concours")
					);
				return (
					<section key={uuidv4()}>
						<Heading as='h3'>{getConcours(currConcours)}</Heading>
						<ChakraTable size='md' marginBottom={10}>
							<Thead>
								<Tr>
									<Th>école</Th>
									<Th>Inscrits</Th>
									<Th>Admissibles</Th>
									<Th>Intégrés</Th>
									<Th>Places</Th>
								</Tr>
							</Thead>
							<Tbody>
								{schools
									?.filter((school) => school.annee === 2021 && matchConcours(concours).includes(school.concours))
									.map((school, i) => {
										return (
											<Tr
												key={i}
												onClick={onOpen}
												onMouseEnter={handleMouseEnter}
												className={scss["row"]}
											>
												{Object.entries(addEmptyProperties(school))
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
									<Th>école</Th>
									<Th>Inscrits</Th>
									<Th>Admissibles</Th>
									<Th>Intégrés</Th>
									<Th>Places</Th>
								</Tr>
							</Tfoot>
						</ChakraTable>
					</section>
				);
			})}

			<SchoolCard
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				school={currentSchool}
			/>
		</>
	);
};

export default Table;
