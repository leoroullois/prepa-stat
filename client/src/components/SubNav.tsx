import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/subnav.css";
// Redux
export interface IProps {
	links: string[];
	path: string;
	changeUrl: boolean;
}

export interface IState {
	active: string;
}

export const SubNav: FC<IProps> = ({ changeUrl, links, path }) => {
	const params = useParams();
	const parse = (elt: string): string => {
		return elt
			.toLowerCase()
			.replaceAll("é", "e")
			.replaceAll("'", "-")
			.replaceAll(" ", "-");
	};
	const parsedLinks = links.map((elt) => parse(elt));
	const clearActives = (): void => {
		parsedLinks.forEach((link) => {
			document.getElementsByClassName(link)[0].classList.remove("active");
		});
	};
	const setActive = (link: HTMLElement) => {
		link.classList.add("active");
	};
	const handleClick: MouseEventHandler = (e) => {
		if (!changeUrl) {
			e.preventDefault();
		}
		clearActives();
		setActive(e.target as HTMLElement);
	};
	const [anchors] = useState(
		parsedLinks.map((elt, i) => (
			<Link
				className={`subnav-link ${elt}`}
				to={`/${path}/${elt}`}
				onClick={handleClick}
				key={i}
			>
				{links[i]}
			</Link>
		))
	);
	useEffect(() => {
		try {
			const param = Object.values(params)[Object.values(params).length - 1];
		document.getElementsByClassName(`${param}`)[0].classList.add("active");
		} catch(err) {
			console.log(err);
		}
	});
	return <nav id='sub-nav'>{anchors}</nav>;
};
