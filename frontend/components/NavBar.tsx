import { FC, MouseEventHandler, useEffect } from "react";
// react-icons
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

import Link from "next/link";
/**Components */
import Dropdown from "./Dropdown";
import AuthBtn from "./AuthBtn";
/**react-icon */
import { IoMenu, IoPersonCircleSharp } from "react-icons/io5";
/**scss */
import scss from "../scss/navbar.module.scss";
/** Redux */
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectNavBar } from "../store/selectors";
import { toggleDarkMode, toggleDropdownStats } from "../store/slices/navBar";
import useWindowSize from "../hooks/useWindowSize";
import { open } from "../store/slices/sideNav";

const NavBar: FC = () => {
	const dispatch = useDispatch();
	const navBar = useSelector(selectNavBar);
	const auth = useSelector(selectAuth);

	const size = useWindowSize();

	const handleStat = () => {
		dispatch(toggleDropdownStats());
	};
	const handleDarkMode: MouseEventHandler = (e) => {
		console.log(e);
		dispatch(toggleDarkMode());
	};

	return (
		<nav className={scss.nav}>
			<div className={scss.responsiveIcon}>
				<IoMenu id='hamburger-icon' onClick={() => dispatch(open())} />
			</div>
			<Link href='/'>
				<a id='nav-logo' className={scss.navLogo}>
					PrépaStat
				</a>
			</Link>
			{size.width >= 1100 && (
				<Link href='/'>
					<a className={scss.link + " " + scss.basicLink}>Accueil</a>
				</Link>
			)}
			{size.width >= 1100 && (
				<Link href='/classements/l-etudiant'>
					<a className={scss.link + " " + scss.basicLink}>Classements</a>
				</Link>
			)}
			{size.width >= 1100 && (
				<Link href='/simulateur'>
					<a className={scss.link + " " + scss.basicLink}>Simulateur</a>
				</Link>
			)}
			{size.width >= 1100 && (
				<div
					className={scss.link + " " + scss.dropdownBtn}
					onClick={handleStat}
				>
					<div className={scss.dropdownBtnContent}>
						Statistiques
						<FaCaretDown className={scss.dropdownIcon} />
					</div>
					{navBar.stats && <Dropdown disableStat={toggleDropdownStats} />}
				</div>
			)}
			{size.width > 768 && <AuthBtn />}
			{auth.isAuthenticated && (
				<IoPersonCircleSharp className={scss.dashboardIcon} />
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
export default NavBar;
