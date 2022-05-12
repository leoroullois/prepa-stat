import { FC } from "react";
import { useSelector } from "react-redux";
import { selectNavBar, selectSideNav } from "../store/selectors";
import { Footer } from "@components/Footer/Footer";
import NavBar from "./Nav/NavBar";
import SideNav from "./Nav/SideNav";
import { useColorMode } from "@chakra-ui/react";

interface IProps {
   children: JSX.Element;
}
const Layout: FC<IProps> = ({ children }) => {
   const { colorMode } = useColorMode();
   const sideNav = useSelector(selectSideNav);
   const style = sideNav.opened
      ? { marginLeft: "0px" }
      : { marginLeft: "-301px" };
   return (
      <>
         <NavBar />
         <SideNav style={style} />
         {children}
         <Footer />
      </>
   );
};

export default Layout;

