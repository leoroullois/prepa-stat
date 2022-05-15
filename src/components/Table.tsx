import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { IoCaretDown, IoCaretUp, IoRemove, IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
   Heading,
   IconButton,
   Table as ChakraTable,
   Tbody,
   Td,
   Text,
   Tfoot,
   Th,
   Thead,
   Tr,
   useDisclosure,
} from "@chakra-ui/react";
import SchoolCard from "@components/SchoolCard/SchoolCard";
import { matchConcours } from "@lib/statistiques";
import { ISchool } from "@models/School";
import scss from "@scss/table.module.scss";
import { selectFavorites, selectNavBar, selectUser } from "@store/selectors";
import {
   addOneSchoolToFavorites,
   removeFromFavorites,
   resetFavorites,
   setFavorites,
} from "@store/slices/favorites";
import { AppDispatch } from "@store/store";

enum sortTypes {
   ASC = "asc",
   DESC = "desc",
   DEF = "default",
}
export interface IProps {
   schools: ISchool[];
}
const Table: FC<IProps> = ({ schools }) => {
   const dispatch = useDispatch<AppDispatch>();

   const user = useSelector(selectUser);

   const { isOpen, onOpen, onClose } = useDisclosure();

   const { darkMode } = useSelector(selectNavBar);

   const router = useRouter();
   const params = router.query.stats as string[];
   const [currentSchool, setCurrentSchool] = useState<ISchool>();

   const [currentSort, setCurrentSort] = useState<sortTypes>(sortTypes.DEF);
   const [sortParam, setSortParam] = useState<keyof ISchool>("places");

   const { filiere, concours } = router.query as {
      filiere: string;
      concours: string;
   };

   const favorites = useSelector(selectFavorites);

   const handleMouseEnter: MouseEventHandler<HTMLTableRowElement> = (e) => {
      const row = e.currentTarget;
      if (row.id) {
         const newCurrentSchool = schools.find(
            (school) => school._id === row.id
         );
         setCurrentSchool(newCurrentSchool);
      }
   };
   useEffect(() => {
      console.log("param ", concours);
   }, [concours]);

   const addEmptyProperties = (school: ISchool): ISchool => {
      let mySchool: any = school;
      const allKeys = [
         "ecole",
         "inscrits_nb",
         "admissibles_nb",
         "integres_nb",
         "places",
      ];
      allKeys.forEach((key) => {
         if (!mySchool.hasOwnProperty(key)) {
            mySchool = {
               ...mySchool,
               [key]: "-",
            };
         }
      });
      return mySchool;
   };

   const sortCallbacks = (param: keyof ISchool, currentSort: sortTypes) => {
      switch (currentSort) {
         case sortTypes.ASC:
            return (a: ISchool, b: ISchool) => {
               let y = b[param];
               let x = a[param];
               if (x == "-") {
                  x = 0;
               }
               if (y == "-") {
                  y = 0;
               }
               if (typeof x === "string" && typeof y === "string") {
                  if (x > y) {
                     return 1;
                  } else {
                     return -1;
                  }
               }
               return y - x;
            };
         case sortTypes.DESC:
            return (a: ISchool, b: ISchool) => {
               let x = a[param];
               let y = b[param];
               if (x == "-") {
                  x = 0;
               }
               if (y == "-") {
                  y = 0;
               }
               if (typeof x === "string" && typeof y === "string") {
                  if (x > y) {
                     return -1;
                  } else {
                     return 1;
                  }
               }
               return x - y;
            };
         default:
            return (a: ISchool, b: ISchool) => a[param];
      }
   };
   const onSortChange = (param: keyof ISchool) => {
      if (param !== sortParam) {
         setSortParam(param);
         setCurrentSort(sortTypes.ASC);
      } else {
         if (currentSort === sortTypes.DEF) {
            setCurrentSort(sortTypes.ASC);
         } else if (currentSort === sortTypes.ASC) {
            setCurrentSort(sortTypes.DESC);
         } else {
            setCurrentSort(sortTypes.DEF);
         }
      }
   };
   const handleFavorite: MouseEventHandler<HTMLElement> = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
         const row = e.currentTarget.parentElement?.parentElement;
         if (row?.id) {
            const currSchool = schools.find((school) => school._id === row.id);
            console.log("currSchool", currSchool);
            console.log("row.id", row.id);
            if (currSchool) {
               if (
                  favorites.findIndex((elt) => elt._id === currSchool._id) !==
                  -1
               ) {
                  // ? si l'école est déjà dans les favoris : la retirer
                  console.log("REMOVE favorites :", favorites);
                  if (favorites.length === 1) {
                     await dispatch(resetFavorites(user._id)).unwrap();
                  } else {
                     await dispatch(
                        removeFromFavorites({
                           userId: user._id,
                           schoolId: currSchool._id,
                        })
                     ).unwrap();
                  }
               } else {
                  // ? sinon : l'ajouter
                  console.log("ADD favorites : ", favorites);
                  await dispatch(
                     addOneSchoolToFavorites({
                        userId: user._id,
                        schoolId: currSchool._id,
                     })
                  ).unwrap();
               }
               await dispatch(setFavorites(user._id)).unwrap();
               setTimeout(async () => {}, 0);
            } else {
               throw new Error("School not found");
            }
         } else {
            console.log("No row found");
         }
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <>
         {matchConcours(concours).map((currConcours) => {
            // ? filtre les écoles
            const currSchools: ISchool[] = schools
               .filter((school) => school.concours === currConcours)
               .filter(
                  (school) =>
                     school.ecole !== currConcours ||
                     school.ecole.includes("concours")
               )
               .filter(
                  (school) =>
                     school.annee === 2021 &&
                     matchConcours(concours).includes(school.concours)
               );
            return (
               <section key={uuidv4()} className={scss["table"]}>
                  <Heading as='h3'>{currConcours}</Heading>
                  <Text>{currSchools.length} écoles</Text>

                  <ChakraTable size='sm' marginBottom={10} variant='simple'>
                     <Thead>
                        <Tr className={scss["th-row"]}>
                           <Th>
                              <div
                                 onClick={() => onSortChange("ecole")}
                                 className={scss["th-row_cell"]}
                              >
                                 <Text color={`gray.${darkMode ? 400 : 700}`}>
                                    écoles
                                 </Text>

                                 {(currentSort === sortTypes.DEF ||
                                    sortParam !== "ecole") && (
                                    <IoRemove
                                       className={scss["th-row_cell__equal"]}
                                    />
                                 )}
                                 {currentSort === sortTypes.ASC &&
                                    sortParam === "ecole" && (
                                       <IoCaretUp
                                          className={scss["th-row_cell__up"]}
                                       />
                                    )}
                                 {currentSort === sortTypes.DESC &&
                                    sortParam === "ecole" && (
                                       <IoCaretDown
                                          className={scss["th-row_cell__down"]}
                                       />
                                    )}
                              </div>
                           </Th>
                           <Th>
                              <div
                                 onClick={() => onSortChange("inscrits_nb")}
                                 className={scss["th-row_cell"]}
                              >
                                 <Text color={`gray.${darkMode ? 400 : 700}`}>
                                    Inscrits
                                 </Text>
                                 {(currentSort === sortTypes.DEF ||
                                    sortParam !== "inscrits_nb") && (
                                    <IoRemove
                                       className={scss["th-row_cell__equal"]}
                                    />
                                 )}
                                 {currentSort === sortTypes.ASC &&
                                    sortParam === "inscrits_nb" && (
                                       <IoCaretUp
                                          className={scss["th-row_cell__up"]}
                                       />
                                    )}
                                 {currentSort === sortTypes.DESC &&
                                    sortParam === "inscrits_nb" && (
                                       <IoCaretDown
                                          className={scss["th-row_cell__down"]}
                                       />
                                    )}
                              </div>
                           </Th>
                           <Th>
                              <div
                                 onClick={() => onSortChange("admissibles_nb")}
                                 className={scss["th-row_cell"]}
                              >
                                 <Text color={`gray.${darkMode ? 400 : 700}`}>
                                    Admissibles
                                 </Text>
                                 {(currentSort === sortTypes.DEF ||
                                    sortParam !== "admissibles_nb") && (
                                    <IoRemove
                                       className={scss["th-row_cell__equal"]}
                                    />
                                 )}
                                 {currentSort === sortTypes.ASC &&
                                    sortParam === "admissibles_nb" && (
                                       <IoCaretUp
                                          className={scss["th-row_cell__up"]}
                                       />
                                    )}
                                 {currentSort === sortTypes.DESC &&
                                    sortParam === "admissibles_nb" && (
                                       <IoCaretDown
                                          className={scss["th-row_cell__down"]}
                                       />
                                    )}
                              </div>
                           </Th>
                           <Th>
                              <div
                                 onClick={() => onSortChange("integres_nb")}
                                 className={scss["th-row_cell"]}
                              >
                                 <Text color={`gray.${darkMode ? 400 : 700}`}>
                                    Integrés
                                 </Text>
                                 {(currentSort === sortTypes.DEF ||
                                    sortParam !== "integres_nb") && (
                                    <IoRemove
                                       className={scss["th-row_cell__equal"]}
                                    />
                                 )}
                                 {currentSort === sortTypes.ASC &&
                                    sortParam === "integres_nb" && (
                                       <IoCaretUp
                                          className={scss["th-row_cell__up"]}
                                       />
                                    )}
                                 {currentSort === sortTypes.DESC &&
                                    sortParam === "integres_nb" && (
                                       <IoCaretDown
                                          className={scss["th-row_cell__down"]}
                                       />
                                    )}
                              </div>
                           </Th>
                           <Th>
                              <div
                                 onClick={() => onSortChange("places")}
                                 className={scss["th-row_cell"]}
                              >
                                 <Text color={`gray.${darkMode ? 400 : 700}`}>
                                    Places
                                 </Text>
                                 {(currentSort === sortTypes.DEF ||
                                    sortParam !== "places") && (
                                    <IoRemove
                                       className={scss["th-row_cell__equal"]}
                                    />
                                 )}
                                 {currentSort === sortTypes.ASC &&
                                    sortParam === "places" && (
                                       <IoCaretUp
                                          className={scss["th-row_cell__up"]}
                                       />
                                    )}
                                 {currentSort === sortTypes.DESC &&
                                    sortParam === "places" && (
                                       <IoCaretDown
                                          className={scss["th-row_cell__down"]}
                                       />
                                    )}
                              </div>
                           </Th>
                           <Th>Favoris</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {currSchools
                           .map((emptySchool) =>
                              addEmptyProperties(emptySchool)
                           )
                           .sort(sortCallbacks(sortParam, currentSort))
                           .map((school, i) => {
                              return (
                                 <Tr
                                    key={i}
                                    onClick={onOpen}
                                    onMouseEnter={handleMouseEnter}
                                    className={scss["row"]}
                                    id={school._id}
                                 >
                                    <Td maxWidth={350}>{school.ecole}</Td>
                                    <Td>{school.inscrits_nb}</Td>
                                    <Td>{school.admissibles_nb}</Td>
                                    <Td>{school.integres_nb}</Td>
                                    <Td>{school.places}</Td>
                                    <Td textAlign='center'>
                                       <IconButton
                                          aria-label='Ajouter à vos favoris'
                                          onClick={handleFavorite}
                                          bgColor={
                                             darkMode ? "white.500" : "gray.300"
                                          }
                                          color={
                                             favorites.findIndex(
                                                (favSchool) =>
                                                   school._id === favSchool._id
                                             ) !== -1
                                                ? "yellow.500"
                                                : "gray.500"
                                          }
                                          icon={
                                             <IoStar
                                                className={classNames(
                                                   scss["favorite-icon"]
                                                )}
                                             />
                                          }
                                       />
                                    </Td>
                                 </Tr>
                              );
                           })}
                     </Tbody>
                     <Tfoot>
                        <Tr>
                           <Th>école</Th>
                           <Th>Inscrits</Th>
                           <Th>Admissibles</Th>
                           <Th>Intégrés</Th>
                           <Th>Places</Th>
                           <Th>Favoris</Th>
                        </Tr>
                     </Tfoot>
                  </ChakraTable>
               </section>
            );
         })}

         <SchoolCard
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            school={{
               _id: currentSchool?._id,
               ecole: currentSchool?.ecole ?? "",
               classement: 5,
               places: currentSchool?.places ?? 0,
               integres_rg_median: currentSchool?.integres_rg_median ?? 0,
               integres_rg_moyen: currentSchool?.integres_rg_median ?? 0,
               integres_cinq_demi: currentSchool?.integres_cinq_demi ?? 0,
               integres_filles: currentSchool?.integres_filles ?? 0,
               url: "https://www.leoroullois.fr",
               annee: currentSchool?.annee ?? 2022,
            }}
         />
      </>
   );
};

export default Table;

