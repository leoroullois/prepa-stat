import { scaleSequentialSqrt } from "d3";
import { FC } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { SideNav } from "./SideNav";
interface IProps {
	children: JSX.Element;
	className?: string;
}
const Layout: FC<IProps> = ({ children, className }) => {
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
	// const style = sideNav.opened
	// ? { marginLeft: "0px" }
	// : { marginLeft: "-301px" };
	const style = {
		marginleft: "0px",
	};
	return (
		<div className={className ? className : ""}>
			<NavBar />
			<SideNav style={style} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
