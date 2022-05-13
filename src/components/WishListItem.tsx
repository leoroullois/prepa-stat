import classNames from "classnames";
import scss from "@scss/wishlistitem.module.scss";
import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { MdOutlineDragIndicator } from "react-icons/md";
import { ISchool } from "@models/School";
import { useColorMode } from "@chakra-ui/react";

interface IProps {
   provided: DraggableProvided;
   position: string;
   school: ISchool;
}
const WishListItem: FC<IProps> = ({ provided, position, school }) => {
   const { colorMode } = useColorMode();
   return (
      <li
         className={classNames(scss["wish-list--item"], {
            [scss["dark-mode"]]: colorMode === "dark",
            [scss["white-mode"]]: colorMode === "light",
         })}
         ref={provided.innerRef}
         {...provided.draggableProps}
         {...provided.dragHandleProps}
      >
         <div className={scss["drag-icon--container"]}>
            <MdOutlineDragIndicator className={scss["wish-list__drag-icon"]} />
         </div>
         <div className={scss["wish-list--right--container"]}>
            <article className={scss["wish-list--content"]}>
               <p className={scss.ecole}>{school.ecole}</p>
               <p className={scss.concours}>Concours : {school.concours}</p>
               <div className={scss.info}>
                  <p>
                     Admissibles :{" "}
                     {school.admissibles_nb ? school.admissibles_nb : "-"}
                  </p>
                  <p>Intégrés : {school.integres_nb}</p>
               </div>
            </article>
            <span
               className={classNames(scss["wish-list__medal"], {
                  [scss["wish-list__position"]]: Number(position) > 2,
               })}
            >
               {position.toString()}
            </span>
         </div>
      </li>
   );
};

export default WishListItem;

