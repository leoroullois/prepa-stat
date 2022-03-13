import React from "react";
import scss from "../scss/footer.module.scss";

export class Footer extends React.Component {
	render() {
		return (
			<footer className={scss.footer}>
				<p>Projet mené par Leyo et LighTender</p>
				<p>Copyright © 2022</p>
			</footer>
		);
	}
}
