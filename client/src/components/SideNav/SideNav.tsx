import React from "react";
/**CSS */
import "./sidenav.css";
/**Redux */
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { chooseAction } from "../SubNav/action";
import { closeAction } from "./action";
/**react-icons */
import { IoClose } from "react-icons/io5";
import { AiFillApi, AiFillCalculator, AiFillHome } from "react-icons/ai";
import { MdLeaderboard, MdScience } from "react-icons/md";
/**react-router */
import { Link } from "react-router-dom";
import { VscRunAll } from "react-icons/vsc";
import { GiMaterialsScience } from "react-icons/gi";
export interface ISideNavState {
	opened: boolean;
}
export interface ISideNavProps {
	resetSubNav: (pNewSection: string, pClasses: string[], pPage: string) => void;
	close: () => void;
	style: { marginLeft: string };
	layout?: any;
}
class Presentational extends React.Component<ISideNavProps, ISideNavState> {
	constructor(props: ISideNavProps) {
		super(props);
		this.closeNav = this.closeNav.bind(this);
	}
	componentDidMount() {
		const close: HTMLElement | null = document.querySelector("#close-icon");
		if (close) {
			close.addEventListener("click", this.closeNav);
		}
	}
	componentWillUnmount() {
		const close: HTMLElement | null = document.querySelector("#close-icon");
		if (close) {
			close.removeEventListener("click", this.closeNav);
		}
	}
	closeNav() {
		this.props.close();
	}
	/**
	 * A function that will set the default value for the subnav of the destination page
	 * @param pPage string of the destination page like "classements"
	 */
	handleClick(pPage: string) {
		const subNavPages = ["classements", "statistiques"];
		if (subNavPages.includes(pPage)) {
			this.props.resetSubNav("", [], pPage);
		}
		this.closeNav();
	}
	render() {
		return (
			<nav id='side-nav' style={this.props.style}>
				<h2>
					<div className='close-icon'>
						<IoClose id='close-icon' />
					</div>
					PrépaStat
				</h2>
				<div className='bar'></div>
				<Link
					className='responsive-link'
					to='/'
					onClick={() => this.handleClick("")}
				>
					<AiFillHome className='responsive-icon' />
					Accueil
				</Link>
				<div className='bar'></div>
				<Link
					className='responsive-link'
					to='/classements/letudiant'
					onClick={() => this.handleClick("classements")}
				>
					<MdLeaderboard className='responsive-icon' />
					Classements
				</Link>
				<div className='bar'></div>
				<Link
					className='responsive-link'
					to='/simulateur'
					onClick={() => this.handleClick("")}
				>
					<VscRunAll className='responsive-icon' />
					<p>Simulateur</p>
				</Link>
				<div className='bar'></div>
				<div className='responsive-link-stats-container'>
					<h3>Statistiques</h3>
					<Link
						className='responsive-link-stats'
						to='/statistiques/mp/generale'
						onClick={() => this.handleClick("statistiques")}
					>
						<AiFillCalculator className='responsive-icon' />
						MP
					</Link>
					<Link
						className='responsive-link-stats'
						to='/statistiques/pc/generale'
						onClick={() => this.handleClick("statistiques")}
					>
						<MdScience className='responsive-icon' />
						PC
					</Link>
					<Link
						className='responsive-link-stats'
						to='/statistiques/psi/generale'
						onClick={() => this.handleClick("statistiques")}
					>
						<GiMaterialsScience className='responsive-icon' />
						PSI
					</Link>
					<Link
						className='responsive-link-stats'
						to='/statistiques/pt/generale'
						onClick={() => this.handleClick("statistiques")}
					>
						<AiFillApi className='responsive-icon' />
						PT
					</Link>
				</div>
				{this.props.layout.width <= 530 && <div className='bar'></div>}
				{this.props.layout.width <= 530 && (
					<Link
						className='responsive-link log-in-link'
						to='/se-connecter'
						onClick={() => this.handleClick("")}
					>
						Se connecter
					</Link>
				)}
				{this.props.layout.width <= 530 && <div className='bar'></div>}
			</nav>
		);
	}
}
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		layout: state.layout,
	};
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		resetSubNav: (pNewSection: string, pClasses: string[], pPage: string) =>
			dispatch(chooseAction(pNewSection, pClasses, pPage)),
		close: () => dispatch(closeAction()),
	};
};
export const SideNav = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
