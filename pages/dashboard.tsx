import { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectFavorites } from "@store/selectors";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard: NextPage = () => {
   const dispatch = useDispatch();
   const auth = useSelector(selectAuth);
   const favorites = useSelector(selectFavorites);
   const [userId] = useState(auth.user?._id);

   const handleLogout: MouseEventHandler = () => {
      dispatch(logout());
   };

   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };

   const handleFavorites: MouseEventHandler = async (e) => {
      const schoolId = "621501cf3b0ddef4ef41dccb";
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
                  <DragDropContext>
                     <Droppable droppableId={scss["wish-list"]}>
                        {(provided) => (
                           <ol
                              className={scss["wish-list"]}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                           >
                              {favorites.map((school, i) => {
                                 return (
                                    <Draggable
                                       key={school._id}
                                       draggableId={school._id}
                                       index={i}
                                    >
                                       {(provided) => {
                                          return (
                                             <li
                                                className={
                                                   scss["wish-list--item"]
                                                }
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
                                                <p>
                                                   {school.ecole} -{" "}
                                                   {school.concours}
                                                </p>
                                                <p
                                                   className={
                                                      scss[
                                                         "wish-list__position"
                                                      ]
                                                   }
                                                >
                                                   {i + 1}
                                                </p>
                                             </li>
                                          );
                                       }}
                                    </Draggable>
                                 );
                              })}
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

