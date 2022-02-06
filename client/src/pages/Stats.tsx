import { FC } from "react";
import { useParams } from "react-router-dom";
/**CSS */
import "../css/stats.css";
/**Redux */
import { connect } from "react-redux";
import { printStat } from "../store/actions/statsAction";
/**Components */
import { SubNav } from "../components/SubNav";
import { NoPage } from "./NoPage";
import { StatsSection } from "../components/StatsSection";

export interface IState {}
const Presentational: FC<any> = () => {
	const filieres = ["mp", "pc", "pt", "psi"];
	const allConcours = [
		"generale",
		"x",
		"ens",
		"centrale",
		"mines",
		"ccinp",
		"e3a",
	];
	type StatsParams = { filiere: string; concours: string };
	let { filiere, concours } = useParams<StatsParams>();
	filiere = filiere as string;
	concours = concours as string;
	if (!filieres.includes(filiere) || !allConcours.includes(concours)) {
		return <NoPage />;
	} else {
		return (
			<main id='stats'>
				<header>
					<h1>Statistiques : filière {filiere}.</h1>
					<SubNav
						links={[
							"Générale",
							"X",
							"ENS",
							"Centrale",
							"Mines",
							"CCINP",
							"E3A",
						]}
						path={"statistiques/" + filiere.toLowerCase()}
						changeUrl={true}
					/>
				</header>
				<div className='bar'></div>
				<StatsSection concours={concours} />
			</main>
		);
	}
};

const dispatchToProps = {
	printStat,
};

export const Stats: FC<any> = connect(null, dispatchToProps)(Presentational);
