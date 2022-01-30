import React from "react";
// CSS
import "./leaderboard.css";
// Redux
import { connect } from "react-redux";
import { RootState } from "../../store";
import { printStat } from "./action";

import { SubNav } from "../../components/SubNav/SubNav";

// ? REACT
export interface IProps {
	classement: string;
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
	navBar?:any;
}
export interface IState {}

export class Presentational extends React.Component<IProps, IState> {
	render() {
		return (
			<div id='leaderboard'>
				<SubNav links={["L'étudiant", "Usine nouvelle"]} path="classements" changeUrl={true}></SubNav>
				<h1>Classement {this.props.classement}.</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
					alias, adipisci repudiandae esse vel consequuntur asperiores quis.
					Ducimus tenetur eligendi quas voluptatem vero maxime, minus voluptate
					dignissimos voluptatum esse eveniet.
				</p>
			</div>
		);
	}
}
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar:state.navBar,
	};
};
const dispatchToProps = {
	printStat
}
export const Leaderboard = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
