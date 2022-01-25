import React from "react";
/**CSS */
import "./stats.css";
/**Redux */
import { connect } from "react-redux";
import { statsAction } from "./action";
import { RootState, AppDispatch } from "../../store";
/**Components */
import { SubNav } from "../../components/SubNav/SubNav";
import {General} from "./Sector/General";
import { X } from "./Sector/X";
import { Ens } from "./Sector/Ens";
import { Centrale } from "./Sector/Centrale";
import { Mines } from "./Sector/Mines";
import { Ccinp } from "./Sector/Ccinp";
import { E3a } from "./Sector/E3a";
export interface IProps {
	concours: string;
	filiere: string;
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
}

export interface IState {}
export class Presentational extends React.Component<IProps, IState> {
	drawChart() {}
	render() {
		const arr:any[] = [<General />,<X/>,<Ens/>,<Centrale/>,<Mines/>,<Ccinp/>,<E3a/>];
		interface Elements {
			generale:typeof arr[0] ;
			x:typeof arr[1],
			ens: typeof arr[2],
			centrale: typeof arr[3],
			mines:typeof arr[4],
			ccinp: typeof arr[5],
			e3a: typeof arr[6]
		}
		const elements:Elements = {
			generale: <General />,
			x:<X/>,
			ens:<Ens/>,
			centrale:<Centrale/>,
			mines:<Mines/>,
			ccinp:<Ccinp/>,
			e3a:<E3a/>
		}
		return (
			<div id='stats'>
				<h1>
					Statistiques : filière {this.props.filiere}.
				</h1>
				<SubNav
					links={["Générale", "X", "ENS", "Centrale", "Mines", "CCINP", "E3A"]}
					path={"statistiques/" + this.props.filiere.toLowerCase()} changeUrl={true}
				/>
				<div className='bar'></div>
				{elements[this.props.subNav.active as keyof Elements]}
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar:state.navBar,
	};
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		printStat: () => dispatch(statsAction()),
	};
};
export const Stats = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
