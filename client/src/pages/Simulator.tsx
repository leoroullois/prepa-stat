import { FC, useEffect } from "react";
import { MultiForm } from "../components/MultiForm/MultiForm";
/**CSS */
import "../css/simulator.css";
export const Simulator: FC<{}> = () => {
	useEffect(() => {
		document.title = "Simulateur d'admissibilité - PrépaStat";
	});

	return (
		<section id='simulator'>
			<h1>Simulateur d'admissibilité</h1>
			<MultiForm />
		</section>
	);
};
