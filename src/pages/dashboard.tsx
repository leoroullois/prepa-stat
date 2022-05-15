import { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { logout } from "@store/slices/auth";
import PrivateRoute from "@components/Auth/PrivateRoute";
import scss from "@scss/dashboard.module.scss";
import { close } from "@store/slices/sideNav";
import { Divider, Heading, useColorMode } from "@chakra-ui/react";
import { MdSpaceDashboard } from "react-icons/md";
import { addToFavorites, resetFavorites } from "@store/slices/favorites";
import MyAccount from "@components/MyAccount";
import WishList from "@components/WishList";
import DashboardInfos from "@components/DashboardInfos";
import DashboardIntro from "@components/DashboardIntro";
import { AppDispatch } from "@store/store";
// TODO: changer la l'implpémentation en bdd des favoris (rajouter l'index)
const Dashboard: NextPage = () => {
   const dispatch = useDispatch<AppDispatch>();
   const auth = useSelector(selectAuth);

   const [userId] = useState(auth.user?._id);

   const handleLogout: MouseEventHandler = () => {
      dispatch(logout());
   };

   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };

   const handleResetFavorites: MouseEventHandler = async (e) => {
      if (userId) {
         // TODO: supprimer les favoris du seul mec avec l'id
         dispatch(resetFavorites(userId));
      } else {
         console.log("You need to be logged in to do that");
      }
   };
   const { colorMode } = useColorMode();
   return (
      <>
         <Head>
            <title>Tableau de bord - PrépaStat</title>
         </Head>
         <PrivateRoute>
            <main onClick={handleCloseNav} className={scss["dashboard"]}>
               <div className='wrapper'>
                  <Heading as='h1' size='xl' marginTop={5}>
                     <span className={scss["main-title"]}>
                        <MdSpaceDashboard />
                        <p>Tableau de bord</p>
                     </span>
                  </Heading>
                  <DashboardIntro />
                  <Divider marginY={5} />
                  <section className={scss["wish-list--container"]}>
                     <DashboardInfos />

                     <Divider marginY={5} />
                     <WishList />
                  </section>
                  <Divider marginY={5} />
                  <Heading as='h2'>Mes simulations</Heading>
                  <p>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                     Aperiam debitis repellat vero in ratione harum inventore,
                     adipisci doloremque, sint, quibusdam hic asperiores sunt.
                     Accusantium facere molestias rerum qui dolores incidunt?
                  </p>
                  <Divider marginY={5} />
                  <MyAccount />
               </div>
            </main>
         </PrivateRoute>
      </>
   );
};

export default Dashboard;

