import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import slugify from "slugify";
import scss from "@scss/stats.module.scss";

import {
   Heading,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from "@chakra-ui/react";
import Table from "@components/Table";
import { useDispatch } from "react-redux";
import { setSchools } from "@store/slices/schools";
import { ISchool } from "@models/School";
import { close } from "@store/slices/sideNav";
import General from "@components/General";

// TODO: les 10 écoles les plus populaires (favoris)
// TODO: les concours dont les écoles sont le + en favoris

interface IProps {
   schools: ISchool[];
}

const Statistiques: FC<IProps> = ({ schools }) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const params = router.query.stats as string[];
   const { 0: filiere, 1: concours } = params;

   const allTabs = [
      "Générale",
      "X",
      "ENS",
      "Centrale",
      "Mines",
      "CCINP",
      "E3A",
   ];
   const paths = router.query.stats as string[];
   const [tabIndex, setTabIndex] = useState(
      allTabs.map((elt) => slugify(elt).toLowerCase()).indexOf(paths[1])
   );

   useEffect(() => {
      dispatch(setSchools(schools));
   }, [filiere, concours, dispatch, schools]);

   const handleTabsChange = (index: number) => {
      const slugifiedTabs = allTabs.map((tab) => slugify(tab).toLowerCase());
      const paths = router.query.stats as string[];
      const baseUrl = "/statistiques/" + paths[0];
      const concours = slugifiedTabs[index];
      const newUrl = baseUrl + "/" + concours;
      router.push(newUrl, undefined, { shallow: true });
      setTabIndex(index);
   };
   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };
   return (
      <>
         <Head>
            <title>Statistiques {filiere.toUpperCase()} - PrépaStat</title>
         </Head>
         <main onClick={handleCloseNav} className={scss.stats}>
            <Heading as='h1' marginY={10}>
               Statistiques {filiere.toUpperCase()}.
            </Heading>
            <Tabs
               index={tabIndex}
               onChange={handleTabsChange}
               size='lg'
               variant='enclosed'
               colorScheme='orange'
            >
               <TabList>
                  {allTabs.map((tab, i) => (
                     <Tab key={i}>{tab}</Tab>
                  ))}
               </TabList>
               <TabPanels>
                  {allTabs.map((tab, i) => (
                     <TabPanel key={i}>
                        <Heading as='h2' size='md'>
                           Statistiques de base.
                        </Heading>
                        {tab === "Générale" && <General />}
                        {tab !== "Générale" && <Table />}
                     </TabPanel>
                  ))}
               </TabPanels>
            </Tabs>
         </main>
      </>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   const filieres = ["mp", "pc", "pt", "psi"];
   const sections = [
      "generale",
      "x",
      "ens",
      "centrale",
      "mines",
      "ccinp",
      "e3a",
   ];
   const paths = [];
   for (const filiere of filieres) {
      for (const section of sections) {
         paths.push({
            params: {
               stats: [filiere, section],
            },
         });
      }
   }
   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   console.log("params", params?.stats);
   const filiere = params?.stats?.[0];
   const concours = params?.stats?.[1];
   const schools = await (
      await fetch(process.env.HOST + "/api/schools/2021/" + filiere)
   ).json();
   return {
      props: { params, schools },
   };
};

export default Statistiques;

