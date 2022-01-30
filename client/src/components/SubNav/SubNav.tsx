import React from "react";
import { Link } from "react-router-dom";
import "./subnav.css";
// Redux
import { connect } from "react-redux";
import { RootState } from "../../store";
import { chooseSubSection } from "./action";
export interface IProps {
	chooseSubSection: (
		pNewSection: string,
		pClasses: string[],
		pPage: string
	) => void;
	links: string[];
	path: string;
	changeUrl: boolean;
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
	navBar?: any;
}

export interface IState {
	active: string;
}

export class Presentational extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	/**
	 * A function that change the active link on the subnav
	 * @param e event object
	 */
	handleClick(e: React.MouseEvent<HTMLElement>): void {
		if (!this.props.changeUrl) {
			e.preventDefault();
			/**
			 * Put the active class on the clicked link
			 */
			const link = e.target as HTMLElement;
			const linkClass = link.className.split(" ")[1];
			const newLink = document.getElementsByClassName(
				linkClass
			)[0] as HTMLAnchorElement;
			const contentElt = document.getElementsByClassName(
				linkClass + "-container"
			)[0] as HTMLDivElement;
			if (newLink) {
				newLink.classList.add("active");
			}
			if (contentElt) {
				contentElt.classList.add("active");
			}
			/**Delete active class for other links*/
			const otherLinks = this.props.links
				.map((elt) => {
					return elt
						.toLowerCase()
						.replaceAll("é", "e")
						.replaceAll("'", "")
						.replaceAll(" ", "-");
				})
				.filter((elt) => elt !== linkClass);
			otherLinks.forEach((link) => {
				const elt = document.getElementsByClassName(
					link
				)[0] as HTMLAnchorElement;
				const contentElt = document.getElementsByClassName(
					link + "-container"
				)[0] as HTMLDivElement;
				if (elt) {
					elt.classList.remove("active");
				}
				if (contentElt) {
					contentElt.classList.remove("active");
				}
			});
		} else {
			const classes = this.props.links.map((elt) => {
				return elt
					.toLowerCase()
					.replaceAll("é", "e")
					.replaceAll("'", "")
					.replaceAll(" ", "-");
			});

			this.props.chooseSubSection(
				e.currentTarget.className.split(" ")[1],
				classes,
				""
			);
		}
	}
	render() {
		// ! Attention à toujours mettre le nom de la catégorie à l'indice 1 pour que la fonction handleClick fonctionne correctement.
		const toRender = this.props.links.map((elt, i, arr) => {
			const myArr = [...arr].map((elt) => {
				return elt
					.toLowerCase()
					.replaceAll("é", "e")
					.replaceAll("'", "")
					.replaceAll(" ", "-");
			});
			const text = elt
				.toLowerCase()
				.replaceAll("é", "e")
				.replaceAll("'", "")
				.replaceAll(" ", "-");
			return (
				<Link
					to={"/" + this.props.path + "/" + text}
					onClick={this.handleClick}
					className={
						i === myArr.indexOf(this.props.subNav.active)
							? "subnav-link " + text + " active"
							: "subnav-link " + text
					}
					key={i}
				>
					{elt}
				</Link>
			);
		});
		return <div id='sub-nav'>{toRender}</div>;
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		subNav: state.subNav,
		leaderboard: state.leaderboard,
		navBar: state.navBar,
	};
};
const dispatchToProps = {
	chooseSubSection,
};
export const SubNav = connect(mapStateToProps, dispatchToProps)(Presentational);
