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
import { Heading } from "@chakra-ui/react";
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

   const handleOnDragEnd = (result: DropResult) => {
      console.log(result);

      const items = Array.from(favorites);

      // * inverse les deux items dans la liste
      const [reorderedItem] = items.splice(result.source.index, 1);
      if (result.destination) {
         items.splice(result.destination.index, 0, reorderedItem);
         updateFavorites(items);
      }
   };

   useEffect(() => {
      updateFavorites(finalFavorites);
   }, [finalFavorites]);
   useEffect(() => {
      if (userId) {
         dispatch(setFavorites(userId));
      }
   }, [userId, dispatch]);
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
               <section className={scss["wish-list--container"]}>
                  <Heading as='h3' size='md'>
                     Nombre d&apos;écoles dans votre liste de voeux :{" "}
                     {favorites.length}
                  </Heading>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                     <Droppable droppableId={scss["wish-list"]}>
                        {(provided) => (
                           <ol
                              className={scss["wish-list"]}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                           >
                              {favorites.map((school, i) => {
                                 let position = (i + 1).toString();
                                 if (i == 0) {
                                    position = "🥇";
                                 } else if (i == 1) {
                                    position = "🥈";
                                 } else if (i == 2) {
                                    position = "🥉";
                                 }
                                 return (
                                    <Draggable
                                       key={school._id}
                                       draggableId={school._id}
                                       index={i}
                                    >
                                       {(provided) => {
                                          return (
                                             <li
                                                className={classNames(
                                                   scss["wish-list--item"],
                                                   {
                                                      [scss["dark-mode"]]:
                                                         darkMode,
                                                      [scss["white-mode"]]:
                                                         !darkMode,

                                                   }
                                                )}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                             >
                                                <MdOutlineDragIndicator
                                                   className={
                                                      scss[
                                                         "wish-list__drag-icon"
                                                      ]
                                                   }
                                                />
                                                <p
                                                   className={
                                                      scss["wish-list--content"]
                                                   }
                                                >
                                                   <span>{school.ecole}</span>
                                                   <span>
                                                      {school.concours}
                                                   </span>
                                                </p>
                                                <span
                                                   className={classNames(
                                                      scss["wish-list__medal"],
                                                      {
                                                         [scss[
                                                            "wish-list__position"
                                                         ]]:
                                                            Number(position) >
                                                            2,
                                                      }
                                                   )}
                                                >
                                                   {position}
                                                </span>
                                             </li>
                                          );
                                       }}
                                    </Draggable>
                                 );
                              })}
                              {provided.placeholder}
                           </ol>
                        )}
                     </Droppable>
                  </DragDropContext>
               </section>
               <button onClick={handleFavorites}>Add school to favorite</button>
               <button onClick={handleResetFavorites}>Reset favorites</button>
               <button onClick={handleLogout}>Se déconnecter</button>
            </main>
         </PrivateRoute>
      </>
   );
};

export default Dashboard;

