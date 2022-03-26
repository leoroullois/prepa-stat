import React from "react";
import scss from "./footer.module.scss";

export class Footer extends React.Component {
   render() {
      return (
         <footer className={scss.footer}>
            <p>Copyright © 2022 - Leyo - LighTender</p>
         </footer>
      );
   }
}
