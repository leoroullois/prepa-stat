import { FC } from "react";
import { useParams } from "react-router-dom";
/**CSS */
import "../css/stats.css";
/**Redux */
import { connect } from "react-redux";
import { printStat } from "../store/actions/statsAction";
import { RootState } from "../store/store";
/**Components */
import { SubNav } from "../components/SubNav";
import { General } from "./Sector/General";
import { X } from "./Sector/X";
import { Ens } from "./Sector/Ens";
import { Centrale } from "./Sector/Centrale";
import { Mines } from "./Sector/Mines";
import { Ccinp } from "./Sector/Ccinp";
import { E3a } from "./Sector/E3a";
import { NoPage } from "./NoPage";
export interface IProps {
	// filiere: string;
	subNav: any;
}

export interface IState {}
const Presentational: FC<IProps> = ({ subNav }) => {
	const filieres = ["mp", "pc", "pt", "psi"];
	const allConcours = [
		"general",
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
	}

	const arr = [
		<General />,
		<X />,
		<Ens />,
		<Centrale />,
		<Mines />,
		<Ccinp />,
		<E3a />,
	];
	interface Elements {
		generale: typeof arr[0];
		x: typeof arr[1];
		ens: typeof arr[2];
		centrale: typeof arr[3];
		mines: typeof arr[4];
		ccinp: typeof arr[5];
		e3a: typeof arr[6];
	}
	const elements: Elements = {
		generale: <General />,
		x: <X />,
		ens: <Ens />,
		centrale: <Centrale />,
		mines: <Mines />,
		ccinp: <Ccinp />,
		e3a: <E3a />,
	};
	return (
		<main id='stats'>
			<header>
				<h1>Statistiques : filière {filiere}.</h1>
				<SubNav
					links={["Générale", "X", "ENS", "Centrale", "Mines", "CCINP", "E3A"]}
					path={"statistiques/" + filiere.toLowerCase()}
					changeUrl={true}
				/>
			</header>
			<div className='bar'></div>
			{elements[subNav.active as keyof Elements]}
		</main>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		subNav: state.subNav,
	};
};
const dispatchToProps = {
	printStat,
};

export const Stats: FC<{}> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
