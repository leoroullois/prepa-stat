import classNames from "classnames";
import scss from "@scss/wishlistitem.module.scss";
import { useSelector } from "react-redux";
import { selectDarkMode } from "@store/selectors";
import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { MdOutlineDragIndicator } from "react-icons/md";
import { ISchool } from "@models/School";

interface IProps {
   provided: DraggableProvided;
   position: string;
   school: ISchool;
}
const WishListItem: FC<IProps> = ({ provided, position, school }) => {
   const darkMode = useSelector(selectDarkMode);
   return (
      <li
         className={classNames(scss["wish-list--item"], {
            [scss["dark-mode"]]: darkMode,
            [scss["white-mode"]]: !darkMode,
         })}
         ref={provided.innerRef}
         {...provided.draggableProps}
         {...provided.dragHandleProps}
      >
         <div className={scss["drag-icon--container"]}>
            <MdOutlineDragIndicator className={scss["wish-list__drag-icon"]} />
         </div>
         <div className={scss["wish-list--right--container"]}>
            <p className={scss["wish-list--content"]}>
               <span>{school.ecole}</span>
               <span>{school.concours}</span>
            </p>
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

