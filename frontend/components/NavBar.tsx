import { FC, useEffect } from "react";
// react-icons
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

import Link from "next/link";
/**Components */
import { Dropdown } from "./Dropdown";
/**react-icon */
import { IoMenu, IoPersonCircleSharp } from "react-icons/io5";
/**scss */
import scss from "../scss/navbar.module.scss";
/** Redux */
import { connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../store/store";
import {
	dropdownStatAction,
	toggleAction,
} from "../store/actions/navBarAction";
import { openAction } from "../store/actions/sideNavAction";
import { AuthBtn } from "./AuthBtn";
export interface IProps {
	toggleDarkMode: (pValue: boolean) => void;
	toggleStats: (pValue: boolean) => void;
	open: () => void;
	layout: any;
	navBar: any;
	auth: any;
}
export interface IState {
	darkMode: boolean;
	leaderboard: boolean;
	stats: boolean;
}
const Presentational: FC<IProps> = ({
	open,
	navBar,
	toggleStats,
	toggleDarkMode,
	auth,
	layout,
}) => {
	useEffect(() => {
		const hamburger: HTMLElement | null =
			document.querySelector("#hamburger-icon");
		if (hamburger) {
			hamburger.addEventListener("click", openNav);
		}
		return () => {
			const hamburger: HTMLElement | null =
				document.querySelector("#hamburger-icon");
			if (hamburger) {
				hamburger.removeEventListener("click", openNav);
			}
		};
	});
	/**
	 * A function that will open the responsive navbar
	 * @param e mouse event
	 */
	const openNav = (e: Event) => {
		open();
	};

	const handleStat = () => {
		toggleStats(navBar.stats);
	};
	const handleDarkMode = () => {
		toggleDarkMode(navBar.darkMode);
	};

	return (
		<nav className={scss.nav}>
			<div className='responsive-icon'>
				<IoMenu id='hamburger-icon' />
			</div>
			<Link href='/'>
				<a id='nav-logo' className='nav-logo'>
					PrépaStat
				</a>
			</Link>
			{layout.width >= 1100 && (
				<Link href='/'>
					<a className='link basic-link'>Accueil</a>
				</Link>
			)}
			{layout.width >= 1100 && (
				<Link href='/classements/l-etudiant'>
					<a className='link basic-link'>Classements</a>
				</Link>
			)}
			{layout.width >= 1100 && (
				<Link href='/simulateur'>
					<a className='link basic-link'>Simulateur</a>
				</Link>
			)}
			{layout.width >= 1100 && (
				<div className='link dropdown-btn' onClick={handleStat}>
					<div className='dropdown-btn-content'>
						Statistiques
						<FaCaretDown className='dropdown-icon' />
					</div>
					{navBar.stats && <Dropdown disableStat={toggleStats} />}
				</div>
			)}
			{layout.width > 768 && <AuthBtn />}
			{auth.isAuthenticated && (
				<IoPersonCircleSharp className='dashboard-icon' />
			)}
			{!navBar.darkMode ? (
				<MdDarkMode style={{ cursor: "pointer" }} onClick={handleDarkMode} />
			) : (
				<MdOutlineDarkMode
					style={{ cursor: "pointer" }}
					onClick={handleDarkMode}
				/>
			)}
		</nav>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		navBar: state.navBar,
		layout: state.layout,
		auth: state.auth,
	};
};
interface IRedux {
	toggleDarkMode: (pValue: boolean) => void;
	toggleStats: (pValue: boolean) => void;
	open: () => void;
}
const mapDispatchToProps: MapDispatchToProps<IRedux, {}> = (
	dispatch
): IRedux => {
	return {
		toggleDarkMode: (pValue: boolean) => dispatch(toggleAction(pValue)),
		toggleStats: (pValue: boolean) => dispatch(dropdownStatAction(pValue)),
		open: () => dispatch(openAction()),
	};
};
export const NavBar: FC<any> = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
