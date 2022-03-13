import { FC } from "react";
import { useSelector } from "react-redux";
import { selectNavBar, selectSideNav } from "../store/selectors";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { Footer } from "./Footer";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/theme/global";

interface IProps {
	children: JSX.Element;
}
const Layout: FC<IProps> = ({ children }) => {
	// const dispatch = useDispatch();
	// const updateDimensions = () => {
	// 	resize(window.innerWidth, window.innerHeight);
	// };
	// useEffect(() => {
	// 	window.addEventListener("resize", updateDimensions);
	// 	return () => {
	// 		window.removeEventListener("resize", updateDimensions);
	// 	};
	// });
	// const handleClick: MouseEventHandler = (e) => {
	// 	e.stopPropagation();
	// 	const target = e.target as HTMLElement;
	// 	if (
	// 		target.id !== "hamburger-icon" &&
	// 		target.id !== "" &&
	// 		target.id !== "nav-responsive" &&
	// 		sideNav.opened
	// 	) {
	// 		console.log("first");
	// 		dispatch(close());
	// 	}
	// 	if (navBar.stats) {
	// 		reset(navBar.stats);
	// 	}
	// };
	// const theme = navBar.darkMode ? darkTheme : lightTheme;
	const { darkMode } = useSelector(selectNavBar);
	const theme = darkMode ? darkTheme : lightTheme;
	const sideNav = useSelector(selectSideNav);
	const style = sideNav.opened
		? { marginLeft: "0px" }
		: { marginLeft: "-301px" };
	// const style = {
	// 	marginLeft: "0px",
	// };
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<NavBar />
			<SideNav style={style} />
			{children}
			<Footer />
		</ThemeProvider>
	);
};

export default Layout;
