import { FC, MouseEventHandler } from "react";
import classNames from "classnames";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoMenu, IoPersonCircleSharp } from "react-icons/io5";

import Link from "next/link";
import AuthBtn from "@components/Auth/AuthBtn";
import scss from "./navbar.module.scss";
import Dropdown from "./Dropdown";

import useWindowSize from "@hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { open } from "@store/slices/sideNav";
import { toggleDropdownStats } from "@store/slices/navBar";
import { selectAuth, selectNavBar } from "@store/selectors";
import { useColorMode } from "@chakra-ui/react";

const NavBar: FC = () => {
   const dispatch = useDispatch();
   const navBar = useSelector(selectNavBar);

   const { toggleColorMode, colorMode } = useColorMode();

   const auth = useSelector(selectAuth);

   const size = useWindowSize();

   const handleStat = () => {
      dispatch(toggleDropdownStats());
   };
   const handleDarkMode: MouseEventHandler = async (e) => {
      toggleColorMode();
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
            <>
               <Link href='/'>
                  <a className={scss.link + " " + scss.basicLink}>Accueil</a>
               </Link>
               <Link href='/classements/l-etudiant'>
                  <a className={scss.link + " " + scss.basicLink}>
                     Classements
                  </a>
               </Link>
               <Link href='/simulateur'>
                  <a className={scss.link + " " + scss.basicLink}>Simulateur</a>
               </Link>
               <div
                  className={classNames(scss.link, scss.dropdownBtn)}
                  // style={{
                  //    backgroundColor:
                  //       colorMode === "dark" ? "#1a1a1a" : "#f5f5f5",
                  //    color: colorMode === "dark" ? "#f5f5f5" : "#1a1a1a",
                  // }}
                  onClick={handleStat}
               >
                  <div className={classNames(scss.dropdownBtnContent)}>
                     Statistiques
                     <FaCaretDown className={scss.dropdownIcon} />
                  </div>
                  {navBar.stats && (
                     <Dropdown disableStat={toggleDropdownStats} />
                  )}
               </div>
            </>
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
            {colorMode === "light" ? (
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

