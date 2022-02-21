import { FC, useState, useEffect } from "react";
interface IProps {
	concours: string;
}
export const StatsSection: FC<IProps> = ({ concours }) => {
	const [properties, setProperties] = useState<string[]>([]);
	const [schools, setSchools] = useState<ISchools[]>([]);
	useEffect(() => {
		fetch("http://localhost:5000/api/schools?filiere=mp&annee=2021")
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
                    <tr>
                        {title}
                    </tr>
                </thead>
                <tbody>
                    {element}
                </tbody>
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
