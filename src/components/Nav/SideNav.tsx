import { FC } from "react";
/**scss */
import scss from "./sidenav.module.scss";
/**Redux */
import { useDispatch } from "react-redux";
/**react-icons */
import { IoClose } from "react-icons/io5";
import { AiFillApi, AiFillCalculator, AiFillHome } from "react-icons/ai";
import { MdLeaderboard, MdScience } from "react-icons/md";
/**react-router */
import { VscRunAll } from "react-icons/vsc";
import { GiMaterialsScience } from "react-icons/gi";
import AuthBtn from "@components/Auth/AuthBtn";
import { Heading, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import useWindowSize from "@hooks/useWindowSize";
import { close } from "@store/slices/sideNav";
import classNames from "classnames";
interface IProps {
   style: { marginLeft: string };
}
const SideNav: FC<IProps> = ({ style }) => {
   const dispatch = useDispatch();
   const size = useWindowSize();
   const { colorMode } = useColorMode();
   return (
      <nav
         className={classNames(scss.link, scss.sideNav, scss.dropdownBtn)}
         style={{
            ...style,
            backgroundColor: colorMode === "dark" ? "#1a1a1a" : "#f5f5f5",
         }}
      >
         <Heading as='h2' size='lg'>
            <div className={scss.closeIcon} onClick={() => dispatch(close())}>
               <IoClose id='close-icon' />
            </div>
            PrépaStat
         </Heading>
         <div className={scss.bar}></div>
         <Link href='/'>
            <a
               className={scss.responsiveLink}
               onClick={() => dispatch(close())}
            >
               <AiFillHome className={scss.responsiveIcon} />
               Accueil
            </a>
         </Link>
         <div className={scss.bar}></div>
         <Link href='/classements/l-etudiant'>
            <a
               className={scss.responsiveLink}
               onClick={() => dispatch(close())}
            >
               <MdLeaderboard className={scss.responsiveIcon} />
               Classements
            </a>
         </Link>
         <div className={scss.bar}></div>
         <Link href='/simulateur'>
            <a
               className={scss.responsiveLink}
               onClick={() => dispatch(close())}
            >
               <VscRunAll className={scss.responsiveIcon} />
               <p>Simulateur</p>
            </a>
         </Link>
         <div className={scss.bar}></div>
         <div className={scss.responsiveLinkStatsContainer}>
            <Heading
               as='h3'
               size='lg'
               // color='gray.800'
               marginLeft={5}
               marginY={3}
            >
               Statistiques
            </Heading>
            <Link href='/statistiques/mp/generale'>
               <a
                  className={scss.responsiveLinkStats}
                  onClick={() => dispatch(close())}
               >
                  <AiFillCalculator className={scss.responsiveIcon} />
                  MP
               </a>
            </Link>
            <Link href='/statistiques/pc/generale'>
               <a
                  className={scss.responsiveLinkStats}
                  onClick={() => dispatch(close())}
               >
                  <MdScience className={scss.responsiveIcon} />
                  PC
               </a>
            </Link>
            <Link href='/statistiques/psi/generale'>
               <a
                  className={scss.responsiveLinkStats}
                  onClick={() => dispatch(close())}
               >
                  <GiMaterialsScience className={scss.responsiveIcon} />
                  PSI
               </a>
            </Link>
            <Link href='/statistiques/pt/generale'>
               <a
                  className={scss.responsiveLinkStats}
                  onClick={() => dispatch(close())}
               >
                  <AiFillApi className={scss.responsiveIcon} />
                  PT
               </a>
            </Link>
         </div>
         {size.width <= 768 && <div className={scss.bar}></div>}
         {size.width <= 768 && <AuthBtn />}
         {size.width <= 768 && <div className={scss.bar}></div>}
      </nav>
   );
};

export default SideNav;

