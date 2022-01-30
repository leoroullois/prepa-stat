import React from "react";
// react-icons
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
/**React-router */
import { Link } from "react-router-dom";
/**Components */
import { Dropdown } from "../Dropdown/Dropdown";
/**react-icon */
import { IoMenu } from "react-icons/io5";
/**CSS */
import "./navbar.css";
/** Redux */
import { connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store";
import {
	dropdownLeaderboardAction,
	dropdownStatAction,
	toggleAction,
} from "./action";
import { openAction } from "../SideNav/action";
import { chooseAction } from "../SubNav/action";
export interface IProps {
	toggleDarkMode: (pValue: boolean) => void;
	toggleStats: (pValue: boolean) => void;
	toggleLeaderboard: (pValue: boolean) => void;
	resetSubNav: (pNewSection: string, pClasses: string[], pPage: string) => void;
	open: () => void;
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
	navBar?: any;
}
export interface IState {
	darkMode: boolean;
	leaderboard: boolean;
	stats: boolean;
}

class Presentational extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.handleLeaderboard = this.handleLeaderboard.bind(this);
		this.handleStat = this.handleStat.bind(this);
		this.handleDarkMode = this.handleDarkMode.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.openNav = this.openNav.bind(this);
	}
	componentDidMount() {
		const hamburger: HTMLElement | null =
			document.querySelector("#hamburger-icon");
		if (hamburger) {
			hamburger.addEventListener("click", this.openNav);
		}
	}
	componentWillUnmount() {
		const hamburger: HTMLElement | null =
			document.querySelector("#hamburger-icon");
		if (hamburger) {
			hamburger.removeEventListener("click", this.openNav);
		}
	}
	/**
	 * A function that will open the responsive navbar
	 * @param e mouse event
	 */
	openNav(e: Event) {
		this.props.open();
	}
	handleStat() {
		this.props.toggleStats(this.props.navBar.stats);
	}
	handleLeaderboard() {
		this.props.toggleLeaderboard(this.props.navBar.leaderboard);
	}
	handleDarkMode() {
		this.props.toggleDarkMode(this.props.navBar.darkMode);
	}
	/**
	 * A function that will set the default value for the subnav of the destination page
	 * @param pPage string of the destination page like "classements"
	 */
	handleClick(pPage: string) {
		this.props.resetSubNav("", [], pPage);
	}
	render() {
		return (
			<nav id='nav'>
				<div className='responsive-icon'>
					<IoMenu id='hamburger-icon' />
				</div>
				<Link className='nav-logo' to='/' id='nav-logo'>
					PrépaStat
				</Link>
				<p>{localStorage.getItem("connected")}</p>
				{this.props.layout.width >= 1024 && (
					<Link className='link basic-link' to='/'>
						Accueil
					</Link>
				)}
				{this.props.layout.width >= 1024 && (
					<Link
						onClick={() => this.handleClick("classements")}
						className='link basic-link'
						to='/classements/letudiant'
					>
						Classements
					</Link>
				)}
				{this.props.layout.width >= 1024 && (
					<Link className='link basic-link' to='/simulateur'>
						Simulateur
					</Link>
				)}
				{this.props.layout.width >= 1024 && (
					<div className='link dropdown-btn' onClick={this.handleStat}>
						<div className='dropdown-btn-content'>
							Statistiques
							<FaCaretDown className='dropdown-icon' />
						</div>
						{this.props.navBar.stats && (
							<Dropdown
								onClick={() => this.handleClick("statistiques")}
								disableStat={this.props.toggleStats}
							/>
						)}
					</div>
				)}
				{this.props.layout.width > 530 && (
					<Link className='link btn-link' to='/se-connecter'>
						Se connecter
					</Link>
				)}
				{!this.props.navBar.darkMode ? (
					<MdDarkMode
						style={{ cursor: "pointer" }}
						onClick={this.handleDarkMode}
					/>
				) : (
					<MdOutlineDarkMode
						style={{ cursor: "pointer" }}
						onClick={this.handleDarkMode}
					/>
				)}
			</nav>
		);
	}
}
// ? REDUX
const mapStateToProps= (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar: state.navBar,
		layout: state.layout,
	};
};
const mapDispatchToProps: MapDispatchToProps<IProps, {}> = (
	dispatch
): IProps => {
	return {
		resetSubNav: (pNewSection: string, pClasses: string[], pPage: string) =>
			dispatch(chooseAction(pNewSection, pClasses, pPage)),
		toggleDarkMode: (pValue: boolean) => dispatch(toggleAction(pValue)),
		toggleStats: (pValue: boolean) => dispatch(dropdownStatAction(pValue)),
		toggleLeaderboard: (pValue: boolean) =>
			dispatch(dropdownLeaderboardAction(pValue)),
		open: () => dispatch(openAction()),
	};
};
export const NavBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
