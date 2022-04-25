import { NextPage } from "next";
import Head from "next/head";
import {
   DragEventHandler,
   MouseEventHandler,
   useEffect,
   useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectDarkMode, selectFavorites } from "@store/selectors";
import { logout } from "@store/slices/auth";
import PrivateRoute from "@components/Auth/PrivateRoute";
import scss from "@scss/dashboard.module.scss";
import { close } from "@store/slices/sideNav";
import {
   Box,
   Button,
   Divider,
   Heading,
   ListItem,
   Text,
   UnorderedList,
} from "@chakra-ui/react";
import { MdOutlineDragIndicator } from "react-icons/md";
import {
   addToFavorites,
   resetFavorites,
   setFavorites,
} from "@store/slices/favorites";
import {
   DragDropContext,
   Droppable,
   Draggable,
   DropReason,
   DropResult,
} from "react-beautiful-dnd";
import { spawn } from "child_process";
import classNames from "classnames";
import Link from "next/link";
import MyAccount from "@components/MyAccount";
import WishList from "@components/WishList";
// TODO: changer la l'implpémentation en bdd des favoris (rajouter l'index)
const Dashboard: NextPage = () => {
   const darkMode = useSelector(selectDarkMode);

   const dispatch = useDispatch();
   const auth = useSelector(selectAuth);
   const finalFavorites = useSelector(selectFavorites);

   const [favorites, updateFavorites] = useState(finalFavorites);

   const [userId] = useState(auth.user?._id);

   const handleLogout: MouseEventHandler = () => {
      dispatch(logout());
   };

   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };

   const handleFavorites: MouseEventHandler = async (e) => {
      const schoolId = "621502163b0ddef4ef421a4b";
      if (userId) {
         dispatch(addToFavorites({ userId, schoolId }));
      } else {
         console.log("You need to be logged in to do that");
      }
   };

   const handleResetFavorites: MouseEventHandler = async (e) => {
      if (userId) {
         // TODO: supprimer les favoris du seul mec avec l'id
         dispatch(resetFavorites(userId));
      } else {
         console.log("You need to be logged in to do that");
      }
   };

   

   
   return (
      <>
         <Head>
            <title>Dashboard - PrépaStat</title>
         </Head>
         <PrivateRoute>
            <main onClick={handleCloseNav} className={scss["dashboard"]}>
               <div className='wrapper'>
                  <button onClick={handleFavorites}>
                     Add school to favorite
                  </button>
                  <button onClick={handleResetFavorites}>
                     Reset favorites
                  </button>
                  <button onClick={handleLogout}>Se déconnecter</button>
                  <Heading as='h1' size='xl' marginTop={5}>
                     Tableau de bord
                  </Heading>
                  <Heading as='h2' size='lg' marginY={5}>
                     👋 Content de vous revoir {auth.user.name} !
                  </Heading>
                  <Text
                     color={`gray.${darkMode ? 300 : 700}`}
                     fontSize={18}
                     textAlign='justify'
                     lineHeight={2}
                  >
                     Ici vous allez pouvoir accéder à vos écoles favorites et
                     les trier de façon à créer votre liste de voeux ! Vous
                     pouvez aussi les supprimer. Bien sûre, il n&apos;y a rien
                     d&apos;officiel et il faudra reporter vous choix sur{" "}
                     <Link href='https://www.scei-concours.fr/'>
                        <a target='_blank'>SCEI</a>
                     </Link>{" "}
                     le moment venu. En ajoutant des écoles dans vos favoris,
                     cela nous permet d&apos;exploiter les données de votre
                     compte pour créer des statistiques et vous permettre
                     d&apos;affiner vos choix.
                  </Text>
                  <Text color={`gray.${darkMode ? 300 : 700}`} fontSize={18}>
                     [A venir] Vous pouvez aussi modifier votre mot de passe, et
                     supprimer votre compte.
                  </Text>
                  <Divider marginY={5} />
                  <section className={scss["wish-list--container"]}>
                     {/* TODO: nb écoles par concours*/}
                     <Box width='100%'>
                        <Heading as='h2' size='lg' marginBottom={3}>
                           📌 Informations générales :
                        </Heading>
                        <UnorderedList>
                           <ListItem fontSize={18}>
                              Nombre d&apos;écoles dans vos favoris:{" "}
                              {favorites.length}
                           </ListItem>
                           <ListItem fontSize={18}>
                              X-ENS : {favorites.length} écoles
                           </ListItem>
                           <ListItem fontSize={18}>
                              Centrale : {favorites.length} écoles
                           </ListItem>
                           <ListItem>
                              Mines : {favorites.length} écoles
                           </ListItem>
                           <ListItem fontSize={18}>
                              CCINP : {favorites.length} écoles
                           </ListItem>
                           <ListItem fontSize={18}>
                              E3A : {favorites.length} écoles
                           </ListItem>
                        </UnorderedList>
                     </Box>

                     <Divider marginY={5} />
                     <WishList/>
                  </section>
                  <Divider marginY={5} />
                  <MyAccount />
               </div>
            </main>
         </PrivateRoute>
      </>
   );
};

export default Dashboard;

