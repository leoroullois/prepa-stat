import { FC, useState, useEffect } from "react";
/**CSS */
import "../css/simulator.css";
export const Simulator: FC<{}> = () => {
	const [schools, setSchools] = useState<ISchools[]>([]);
	const [properties, setProperties] = useState<string[]>([]);
	useEffect(() => {
		fetch("/api/schools?filiere=mp&annee=2021")
			.then((res) => res.json())
			.then((data) => {
				setSchools(data);
				setProperties(Object.keys(data[0]));
			});
	});
	const title = properties.map((elt, index) => {
		return <th key={index}>{elt}</th>;
	});
	const element = schools.map((elt:any, index) => {
		const output = [];
		for (const property in elt) {
			const row = <th>{elt[property]}</th>;
			output.push(row);
		}
		return (
			<tr key={index}>
				{output}
			</tr>
		);
	});
	return (
		<div id='simulator'>
			<h1>Simulation</h1>
			<table>
				<thead>
					<tr>{title}</tr>
				</thead>
				<tbody>{element}</tbody>
			</table>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem in
				architecto nisi. Nisi sint dolores itaque error, consequatur vero. Eius
				ex aliquam quisquam suscipit nulla voluptatum animi inventore laudantium
				cumque?
			</p>
		</div>
	);
};
