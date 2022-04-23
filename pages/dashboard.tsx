import { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { logout } from "@store/slices/auth";
import PrivateRoute from "@components/Auth/PrivateRoute";
import scss from "@scss/dashboard.module.scss";
import { close } from "@store/slices/sideNav";
import { Heading } from "@chakra-ui/react";

const Dashboard: NextPage = () => {
   const dispatch = useDispatch();
   const auth = useSelector(selectAuth);

   const handleLogout: MouseEventHandler = () => {
      dispatch(logout());
   };

   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };
   return (
      <>
         <Head>
            <title>Dashboard - PrépaStat</title>
         </Head>
         <PrivateRoute>
            <main onClick={handleCloseNav} className={scss["dashboard"]}>
               <Heading as='h1' size='xl'>
                  Dashboard
               </Heading>
               <Heading as='h2' size='lg'>
                  👋 Content de vous revoir {auth.user.name} !
               </Heading>
               {/* <h3>Token {JSON.stringify(token)}</h3> */}
               <button onClick={handleLogout}>Se déconnecter</button>
            </main>
         </PrivateRoute>
      </>
   );
};

// export const getStaticProps: GetStaticProps = async () => {
// 	return {
// 		props: {
// 			name: localStorage.getItem("jwtToken"),
// 		},
// 	};
// };

export default Dashboard;

