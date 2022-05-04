import scss from "@scss/wishlist.module.scss";
import { Heading, Text } from "@chakra-ui/react";

import {
   DragDropContext,
   Droppable,
   Draggable,
   DropResult,
} from "react-beautiful-dnd";
import { selectAuth, selectDarkMode, selectFavorites } from "@store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFavorites } from "@store/slices/favorites";
import WishListItem from "./WishListItem";
import { AppDispatch } from "@store/store";
import Link from "next/link";

const WishList = () => {
   const dispatch = useDispatch<AppDispatch>();
   const darkMode = useSelector(selectDarkMode);
   const finalFavorites = useSelector(selectFavorites);
   const auth = useSelector(selectAuth);
   const [userId] = useState(auth.user?._id);

   const [favorites, updateFavorites] = useState(finalFavorites);
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
   const getPosition = (i: number): string => {
      if (i == 0) {
         return "🥇";
      } else if (i == 1) {
         return "🥈";
      } else if (i == 2) {
         return "🥉";
      } else {
         return (i + 1).toString();
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
         <Heading as='h2' size='lg' marginY={5}>
            🚀 Votre liste de voeux :
         </Heading>
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={scss["wish-list"]}>
               {(provided) => (
                  <ol
                     className={scss["wish-list"]}
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                  >
                     {favorites.length === 0 && (
                        <Text>
                           😭 Vous n&apos;avez pas encore d&apos;écoles dans vos favoris. Vous pouvez en
                           ajouter en naviguant dans la section{" "}
                           <Link
                              href={`/statistiques/${auth.user.filiere.toLocaleLowerCase()}`}
                           >
                              <a>statistiques</a>
                           </Link>{" "}
                           de votre filière.
                        </Text>
                     )}
                     {favorites.map((school, i) => {
                        const position = getPosition(i);
                        return (
                           <Draggable
                              key={school._id}
                              draggableId={school._id}
                              index={i}
                           >
                              {(provided) => {
                                 return (
                                    <WishListItem
                                       position={position}
                                       provided={provided}
                                       school={school}
                                    />
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
         {favorites.length > 0 && (
            <Text marginTop={5} fontSize={18}>
               💡 Vous pouvez classer vos écoles présentes dans votre liste de
               voeux comme vous le souhaitez.
            </Text>
         )}
      </>
   );
};

export default WishList;

