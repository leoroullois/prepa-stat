import { FC } from "react";
// CSS
import "../css/leaderboard.css";
// Redux
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { printStat } from "../store/actions/statsAction";

import { SubNav } from "../components/SubNav";

// ? REACT
export interface IProps {
	classement: string;
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
	navBar?: any;
}
export interface IState {}

const Presentational: FC<IProps> = ({ classement }) => {
	return (
		<div id='leaderboard'>
			<SubNav
				links={["L'étudiant", "Usine nouvelle"]}
				path='classements'
				changeUrl={true}
			></SubNav>
			<h1>Classement {classement}.</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores alias,
				adipisci repudiandae esse vel consequuntur asperiores quis. Ducimus
				tenetur eligendi quas voluptatem vero maxime, minus voluptate
				dignissimos voluptatum esse eveniet.
			</p>
		</div>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		subNav: state.subNav,
		navBar: state.navBar,
	};
};
const dispatchToProps = {
	printStat,
};
export const Leaderboard = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
