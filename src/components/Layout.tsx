import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Footer } from '@components/Footer/Footer';
import NavBar from '@components/Nav/NavBar';
import SideNav from '@components/Nav/SideNav';
import { selectSideNav } from '@store/selectors';

interface IProps {
   children: JSX.Element;
}
const Layout: FC<IProps> = ({ children }) => {
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

