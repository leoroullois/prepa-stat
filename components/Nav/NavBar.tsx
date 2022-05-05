import { FC, MouseEventHandler, useEffect } from "react";
// react-icons
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

import Link from "next/link";
/**Components */
import Dropdown from "./Dropdown";
import AuthBtn from "../Auth/AuthBtn";
/**react-icon */
import { IoMenu, IoPersonCircleSharp } from "react-icons/io5";
/**scss */
import scss from "./navbar.module.scss";
/** Redux */
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectNavBar } from "../../store/selectors";
import { setColorMode, toggleDarkMode, toggleDropdownStats } from "@store/slices/navBar";
import useWindowSize from "../../hooks/useWindowSize";
import { open } from "../../store/slices/sideNav";
import classNames from "classnames";
import { useColorMode } from "@chakra-ui/react";

const NavBar: FC = () => {
   const dispatch = useDispatch();
   const navBar = useSelector(selectNavBar);
   const { darkMode } = navBar;

   const { toggleColorMode, colorMode } = useColorMode();

   const auth = useSelector(selectAuth);

   const size = useWindowSize();

   const handleStat = () => {
      dispatch(toggleDropdownStats());
   };
   const handleDarkMode: MouseEventHandler = (e) => {
      toggleColorMode();
      dispatch(setColorMode(colorMode==="dark"))
      console.log("Color mode is", colorMode);
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
               className={classNames(scss.link, scss.dropdownBtn, {
                  "bg-black": darkMode,
                  "text-white": darkMode,
                  "bg-white": !darkMode,
                  "text-dark": !darkMode,
               })}
               onClick={handleStat}
            >
               <div className={classNames(scss.dropdownBtnContent)}>
                  Statistiques
                  <FaCaretDown className={scss.dropdownIcon} />
               </div>
               {navBar.stats && <Dropdown disableStat={toggleDropdownStats} />}
            </div>
         )}
         {size.width > 768 && <AuthBtn />}
         <div className={scss["icons-container"]}>
            {auth.isAuthenticated && (
               <Link href='/dashboard'>
                  <a>
                     <IoPersonCircleSharp className={scss.dashboardIcon} />
                  </a>
               </Link>
            )}
            {!navBar.darkMode ? (
               <MdDarkMode
                  onClick={handleDarkMode}
                  className={scss.darkModeIcon}
               />
            ) : (
               <MdOutlineDarkMode
                  onClick={handleDarkMode}
                  className={scss.darkModeIcon}
               />
            )}
         </div>
      </nav>
   );
};
export default NavBar;

