import { FC, useEffect } from "react";
import { SimulatorGrades } from "../components/SimulatorGrades";
import { SimulatorParams } from "../components/SimulatorParams";
import { SimulatorResult } from "../components/SimulatorResult";
/**CSS */
import "../css/simulator.css";
export const Simulator: FC<{}> = () => {
	useEffect(() => {
		document.title = "Simulateur d'admissibilité - PrépaStat";
	});

	return (
		<section id='simulator'>
			<h1>Simulateur d'admissibilité</h1>
			<section className='simulator-container'>
				<SimulatorParams />
				<SimulatorGrades />
				<SimulatorResult />
			</section>
		</section>
	);
};
