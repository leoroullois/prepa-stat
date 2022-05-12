import Link from "next/link";
import React from "react";
import scss from "./footer.module.scss";

export class Footer extends React.Component {
   render() {
      return (
         <footer className={scss.footer}>
            <p>
               Copyright © 2022 -{" "}
               <Link href='https://github.com/leoroullois'>
                  <a target='_blank' className={scss.link}>
                     Leyo
                  </a>
               </Link>{" "}
               -{" "}
               <Link href='https://github.com/LighTend3r'>
                  <a target='_blank' className={scss.link}>
                     LighTend3r
                  </a>
               </Link>
            </p>
         </footer>
      );
   }
}
