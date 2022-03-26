import React, { FC } from "react";
import Link from "next/link";
/**Icons */
import { MdScience } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { AiFillCalculator, AiFillApi } from "react-icons/ai";

import scss from "./navbar.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectNavBar } from "@store/selectors";

interface IProps {
   disableStat: (pValue: boolean) => void;
}
const Dropdown: FC<IProps> = ({ disableStat }) => {
   const handleClick = () => {
      disableStat(false);
   };
   const { darkMode } = useSelector(selectNavBar);

   return (
      <div
         className={classNames(scss.dropdownContent, {
            "bg-black": darkMode,
            "text-white": darkMode,
            "bg-white": !darkMode,
            "text-dark": !darkMode,
         })}
         onClick={handleClick}
      >
         <ul>
            <li>
               <Link href='/statistiques/mp/generale'>
                  <a className={scss.dropdownLink}>
                     <AiFillCalculator />
                     MP
                  </a>
               </Link>
            </li>
            <li>
               <Link href='/statistiques/pc/generale'>
                  <a className={scss.dropdownLink}>
                     <MdScience />
                     PC
                  </a>
               </Link>
            </li>
            <li>
               <Link href='/statistiques/psi/generale'>
                  <a className={scss.dropdownLink}>
                     <GiMaterialsScience />
                     PSI
                  </a>
               </Link>
            </li>
            <li>
               <Link href='/statistiques/pt/generale'>
                  <a className={scss.dropdownLink}>
                     <AiFillApi />
                     PT
                  </a>
               </Link>
            </li>
         </ul>
      </div>
   );
};
export default Dropdown;
