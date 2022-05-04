import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
} from "@chakra-ui/react";
/**react-icons */
import { FaStar } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { IoCaretDown, IoCaretUpOutline } from "react-icons/io5";
import { RiExternalLinkFill } from "react-icons/ri";

import scss from "./schoolcard.module.scss";

import { ISchool } from "@models/School";
import { FC, useEffect } from "react";
import { getConcours } from "@lib/statistiques";
import classnames from "classnames";

const SchoolCardContent: FC<ISchoolCardProps> = ({ data, maxPlace }) => {
   return (
      <section className={scss["school-card"]}>
         <div className={scss["favorite-icon-container"]}>
            <FaStar className={scss["favorite-icon"]} />
         </div>
         <div className={scss["card-band"]}>
            <h2>{data.ecole}</h2>
            <a
               className={scss["card-band-link-container"]}
               href={data.url}
               target='_blank'
               rel='noopener noreferrer'
            >
               <RiExternalLinkFill className={scss["card-band-link"]} />
            </a>
         </div>
         <div id='card-header'>
            <div className={scss["card-leaderboard"]}>
               <div className={scss["card-leaderboard-title"]}>
                  Classement :
               </div>
               <div className={scss["card-leaderboard-content"]}>
                  {data.classement.toString().padStart(3, "0")}
                  <span>/{maxPlace}</span>
               </div>
            </div>
         </div>
         <p>{data._id}</p>
         <div className={scss["card-content"]}>
            <div className={scss["integres"]}>
               <h3>Intégrés {data.annee}</h3>
               <div className={scss["bar"]}></div>
               <div className={classnames(scss["card-icon"])}>
                  <p>
                     Nombre de places: <span>{data.places}</span>
                  </p>
                  <IoCaretDown className={classnames(scss["down-icon"])} />
               </div>
               <div className={classnames(scss["card-icon"])}>
                  <p>
                     Rang médian :{" "}
                     <span>
                        <span>{data.integres_rg_median}</span>
                     </span>
                  </p>
                  <IoCaretUpOutline className={classnames(scss["up-icon"])} />
               </div>
               <div className={classnames(scss["card-icon"])}>
                  <p>
                     Rang moyen: <span>{data.integres_rg_moyen}</span>
                  </p>
                  <GoDash className={classnames(scss["equal-icon"])} />
               </div>
               <div className={classnames(scss["card-icon"])}>
                  <p>
                     % de 5/2 : <span>{data.integres_cinq_demi}%</span>
                  </p>
                  <GoDash className={classnames(scss["equal-icon"])} />
               </div>
               <div className={classnames(scss["card-icon"])}>
                  <p>
                     % de fille : <span>{data.integres_filles}%</span>
                  </p>
                  <GoDash className={classnames(scss["equal-icon"])} />
               </div>
            </div>
            <div className={scss["other-container"]}>
               <h3>Autre</h3>
               <div className={scss["bar"]}></div>
               <div className={scss["card-subnav-container"]}>
                  <p>SubNav here</p>
               </div>
               <div className={scss["other-content"]}>
                  <div
                     className={classnames(
                        scss["informations-container"],
                        scss["active"]
                     )}
                  >
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Sint qui ex molestias repellendus, quisquam et
                        labore explicabo distinctio doloribus tempora at itaque
                        magnam reprehenderit earum rerum sed vitae voluptatibus.
                        Illum?
                     </p>
                  </div>
                  <div className={scss["graphiques-container"]}>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Sint qui ex molestias repellendus, quisquam et
                        labore explicabo distinctio doloribus tempora at itaque
                        magnam reprehenderit earum rerum sed vitae voluptatibus.
                        Illum? Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit. Ipsam laboriosam voluptatibus nostrum
                        explicabo perferendis doloribus reiciendis enim, maiores
                        molestias culpa facilis soluta vel vitae deserunt
                        reprehenderit itaque tempora! Quis, excepturi?
                     </p>
                  </div>
                  <div className={scss["lorem-ipsum-container"]}>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Sint qui ex molestias repellendus, quisquam et
                        labore
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SchoolCardContent;

