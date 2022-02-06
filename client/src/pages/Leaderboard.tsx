import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// CSS
import "../css/leaderboard.css";
// Redux
import { connect } from "react-redux";
import { printStat } from "../store/actions/statsAction";
/**Components */
import { SchoolLeaderboard } from "../components/SchoolLeaderboard";
import { SubNav } from "../components/SubNav";
import { NoPage } from "./NoPage";

// ? REACT
export interface IProps {
	classement: string;
}
export interface IState {}

const Presentational: FC<IProps> = () => {
	const classements = ["l-etudiant", "usine-nouvelle"];
	type ParamsState = {
		id: string;
	};
	const { id } = useParams<ParamsState>();
	const [classement, setClassement] = useState(`${id}`);
	useEffect(() => {
		setClassement(`${id}`);
	}, [classement, id]);
	const match = (concours: string): string => {
		if (concours === "l-etudiant") {
			return "L'étudiant";
		} else {
			return "Usine nouvelle";
		}
	};
	if (!classements.includes(classement)) {
		return <NoPage />;
	} else {
		return (
			<div id='leaderboard'>
				<SubNav
					links={["L'étudiant", "Usine nouvelle"]}
					path='classements'
					changeUrl={true}
				/>
				<h1>Classement {match(classement)}.</h1>
				<SchoolLeaderboard classement={match(classement)} />
			</div>
		);
	}
};
// ? REDUX

const dispatchToProps = {
	printStat,
};
export const Leaderboard: FC<any> = connect(
	null,
	dispatchToProps
)(Presentational);
