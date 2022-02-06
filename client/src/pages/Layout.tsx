import React, { FC, MouseEventHandler, useEffect } from "react";
import { Outlet } from "react-router-dom";
// CSS
import "../css/layout.css";
// Redux
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { resizeAction } from "../store/actions/layoutAction";

/** Dark Mode */
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/global";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { SideNav } from "../components/SideNav";
import { dropdownStatAction } from "../store/actions/navBarAction";
import { closeAction } from "../store/actions/sideNavAction";
// ? REACT
export interface ILayoutProps {
	reset: (pValue: boolean) => void;
	resize: (pWidth: number, pHeight: number) => void;
	close: () => void;
	navBar: any;
	sideNav: any;
}
export interface ILayoutState {
	width: number;
	height: number;
	mainBlack: string;
	mainWhite: string;
}
const Presentational: FC<ILayoutProps> = ({
	resize,
	sideNav,
	close,
	reset,
	navBar,
}) => {
	const dispatch = useDispatch();
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
			sideNav.opened
		) {
			console.log("first");
			dispatch(close());
		}
		if (navBar.stats) {
			reset(navBar.stats);
		}
	};
	const theme = navBar.darkMode ? darkTheme : lightTheme;
	const style = sideNav.opened
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
		navBar: state.navBar,
		layout: state.layout,
		sideNav: state.sideNav,
	};
};
interface IRedux {
	reset: (pValue: boolean) => void;
	resize: (pWidth: number, pHeight: number) => void;
	close: () => void;
}
const mapDispatchToProps = {
	reset: (pValue: boolean) => (dispatch: AppDispatch) =>
		dispatch(dropdownStatAction(pValue)),
	resize: (pWidth: number, pHeight: number) => (dispatch: AppDispatch) =>
		dispatch(resizeAction(pWidth, pHeight)),
	close: () => (dispatch: AppDispatch) => dispatch(closeAction()),
};
export const Layout: FC<any> = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
