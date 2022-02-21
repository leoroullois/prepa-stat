import { FC, useState, useEffect } from "react";
interface IProps {
	concours: string;
	filiere: string;
}
export const StatsSection: FC<IProps> = ({ concours, filiere }) => {
	const [properties, setProperties] = useState<string[]>([]);
	const [schools, setSchools] = useState<ISchools[]>([]);
	const matchConcours = (concours: string): string[] => {
		// TODO: fusion x and ens and create a new category autre
		switch (concours) {
			case "x-ens":
				return ["concours_ecole_polytechnique", "banque_ens"];
			case "centrale":
				return ["banque_centrale_supelec"];
			case "mines":
				return ["concours_commun_mines_ponts", "concours_mines_télécom"];
			case "ccinp":
				return [
					"concours_commun_inp",
					"banque_epreuves_ccinp_inter_filière",
					"banque_epreuves_ccinp",
				];
			case "e3a":
				return [
					"concours_polytech_inter_filière",
					"puissance_alpha",
					"avenir_prépas",
					"fesic",
					"autres_écoles_e3a",
				];
			case "autre":
				return ["groupe_insa", "cesi", "epita"];
			default:
				return [];
		}
	};
	useEffect(() => {
		fetch(
			`http://localhost:5000/api/schools/${filiere}/${
				matchConcours(concours)[0]
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				setSchools(data);
				setProperties(Object.keys(data[0]));
			});
	});
	const title = properties.map((elt, index) => {
		return <th key={index}>{elt}</th>;
	});
	const element = schools.map((elt: any, index) => {
		const output = [];
		let i = 0;
		for (const property in elt) {
			const row = <th key={i}>{elt[property]}</th>;
			output.push(row);
			i++;
		}
		return <tr key={index}>{output}</tr>;
	});
	return (
		<section>
			<h2>{concours}</h2>
			<table>
				<thead>
					<tr>{title}</tr>
				</thead>
				<tbody>{element}</tbody>
			</table>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
				voluptatibus minus assumenda consectetur, sequi maxime ratione nostrum
				iusto in aut vero neque aliquid, corporis animi omnis saepe? Architecto,
				nesciunt expedita.
			</p>
		</section>
	);
};
