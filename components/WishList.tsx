import scss from "@scss/wishlist.module.scss";
import { Heading, Text } from "@chakra-ui/react";
import { MdOutlineDragIndicator } from "react-icons/md";

import {
   DragDropContext,
   Droppable,
   Draggable,
   DropResult,
} from "react-beautiful-dnd";
import classNames from "classnames";
import { selectAuth, selectDarkMode, selectFavorites } from "@store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setFavorites } from "@store/slices/favorites";
import WishListItem from "./WishListItem";

const WishList = () => {
   const dispatch = useDispatch();
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
         <Text marginTop={5} fontSize={18}>
            Vous pouvez réarranger l&apos;ordre de votre liste de voeux comme
            vous le souhaitez.
         </Text>
      </>
   );
};

export default WishList;

