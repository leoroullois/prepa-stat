import { FC, useEffect } from "react";
import MultiForm from "../components/MultiForm/MultiForm";
/**CSS */
import scss from "../scss/simulator.module.scss";

const Simulator: FC<{}> = () => {
	useEffect(() => {
		document.title = "Simulateur d'admissibilité - PrépaStat";
	});

	return (
		<section className={scss.simulator}>
			<h1>Simulateur d&apos;admissibilité</h1>
			<MultiForm />
		</section>
	);
};

export default Simulator;
