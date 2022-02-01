import React, { FC, MouseEventHandler, useEffect } from "react";
import { Outlet } from "react-router-dom";
// CSS
import "../css/layout.css";
// Redux
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { reset, resize, close } from "../store/actions/layoutAction";

/** Dark Mode */
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/global";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { SideNav } from "../components/SideNav";
// ? REACT
export interface ILayoutProps {
	reset: (pValue: boolean) => void;
	resize: (pWidth: number, pHeight: number) => void;
	close: () => void;
	navBar: any;
	resNavBar: any;
}
export interface ILayoutState {
	width: number;
	height: number;
	mainBlack: string;
	mainWhite: string;
}
const Presentational: FC<ILayoutProps> = ({
	resize,
	resNavBar,
	close,
	reset,
	navBar,
}) => {
	const updateDimensions = () => {
		resize(window.innerWidth, window.innerHeight);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	});
	const handleClick: MouseEventHandler = (e) => {
		e.stopPropagation();
		const target = e.target as HTMLElement;
		if (
			target.id !== "hamburger-icon" &&
			target.id !== "" &&
			target.id !== "nav-responsive" &&
			resNavBar.opened
		) {
			close();
		}
		if (navBar.stats) {
			reset(navBar.stats);
		}
	};
	const theme = navBar.darkMode ? darkTheme : lightTheme;
	const style = resNavBar.opened
		? { marginLeft: "0px" }
		: { marginLeft: "-301px" };
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<div id='layout' onClick={handleClick}>
				<NavBar />
				<SideNav style={style} />
				<Outlet />
				<Footer />
			</div>
		</ThemeProvider>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar: state.navBar,
		layout: state.layout,
		resNavBar: state.resNavBar,
	};
};
const dispatchToProps = {
	reset,
	resize,
	close,
};
export const Layout: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
