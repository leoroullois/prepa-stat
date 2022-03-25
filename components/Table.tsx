import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
   Button,
   Heading,
   Skeleton,
   Stack,
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
import { v4 as uuidv4 } from "uuid";
import { ISchool } from "@models/School";
import SchoolCard from "@components/SchoolCard/SchoolCard";
import scss from "./table.module.scss";
import { getConcours } from "@lib/statistiques";
import { useSelector } from "react-redux";
import { selectSchools } from "@store/selectors";

import { matchConcours } from "@lib/statistiques";
enum sortTypes {
   ASC = "asc",
   DESC = "desc",
   DEF = "default",
}
const Table = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const router = useRouter();
   const params = router.query.stats as string[];
   const [currentSchool, setCurrentSchool] = useState<ISchool>();

   const [currentSort, setCurrentSort] = useState<sortTypes>(sortTypes.DEF);
   const [sortParam, setSortParam] = useState<keyof ISchool>("places");

   const { 0: filiere, 1: concours } = params;
   const schools = useSelector(selectSchools);

   const handleMouseEnter: MouseEventHandler<HTMLTableRowElement> = (e) => {
      const row = e.currentTarget;
      setCurrentSchool(
         schools?.filter(
            (school) => school.ecole === row.firstChild?.textContent
         )[0]
      );
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
            return (a: ISchool, b: ISchool) => b[param] - a[param];
         case sortTypes.DESC:
            return (a: ISchool, b: ISchool) => a[param] - b[param];
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

   return (
      <>
         {matchConcours(concours).map((currConcours) => {
            // ? filtre les écoles
            const currSchools: ISchool[] = schools
               ?.filter((school) => school.concours === currConcours)
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
               <section key={uuidv4()}>
                  <Heading as='h3'>{getConcours(currConcours)}</Heading>
                  <Text>{currSchools.length} écoles</Text>
                  <Text>sortParam {sortParam}</Text>
                  <Text>currentSort {currentSort}</Text>

                  <ChakraTable size='md' marginBottom={10}>
                     <Thead>
                        <Tr>
                           <Th onClick={() => onSortChange("ecole")}>école</Th>
                           <Th onClick={() => onSortChange("inscrits_nb")}>
                              Inscrits
                           </Th>
                           <Th onClick={() => onSortChange("admissibles_nb")}>
                              Admissibles
                           </Th>
                           <Th onClick={() => onSortChange("integres_nb")}>
                              Intégrés
                           </Th>
                           <Th onClick={() => onSortChange("places")}>
                              Places
                           </Th>
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
                                 >
                                    <Td maxWidth={350}>{school.ecole}</Td>
                                    <Td>{school.inscrits_nb}</Td>
                                    <Td>{school.admissibles_nb}</Td>
                                    <Td>{school.integres_nb}</Td>
                                    <Td>{school.places}</Td>
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
