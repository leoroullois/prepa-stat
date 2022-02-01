import React from "react";
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
	leaderboard?: any;
	layout?: any;
	stats?: any;
	subNav?: any;
	navBar?: any;
	resNavBar?: any;
}
export interface ILayoutState {
	width: number;
	height: number;
	mainBlack: string;
	mainWhite: string;
}

class Presentational extends React.Component<ILayoutProps, ILayoutState> {
	constructor(props: ILayoutProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}
	updateDimensions() {
		this.props.resize(window.innerWidth, window.innerHeight);
	}
	handleClick(e: React.MouseEvent) {
		e.stopPropagation();
		const target = e.target as HTMLElement;
		if (
			target.id !== "hamburger-icon" &&
			target.id !== "" &&
			target.id !== "nav-responsive" &&
			this.props.resNavBar.opened
		) {
			this.props.close();
		}
		if (this.props.navBar.stats) {
			this.props.reset(this.props.navBar.stats);
		}
	}
	render() {
		const theme = this.props.navBar.darkMode ? darkTheme : lightTheme;
		const style = this.props.resNavBar.opened
			? { marginLeft: "0px" }
			: { marginLeft: "-301px" };
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<div id='layout' onClick={this.handleClick}>
					<NavBar />
					<SideNav style={style} />
					<Outlet />
					<Footer />
				</div>
			</ThemeProvider>
		);
	}
}

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
export const Layout = connect(mapStateToProps, dispatchToProps)(Presentational);
