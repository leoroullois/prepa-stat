import {
   GetServerSideProps,
   GetStaticPaths,
   GetStaticProps,
   InferGetStaticPropsType,
   NextPage,
} from "next";
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
import { ISchool } from "@models/School";
import { close } from "@store/slices/sideNav";
import General from "@components/General";

// TODO: les 10 écoles les plus populaires (favoris)
// TODO: les concours dont les écoles sont le + en favoris

const Statistiques = ({
   schools,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { filiere, concours } = router.query as {
      filiere: string;
      concours: string;
   };
   const allTabs = [
      "Générale",
      "X",
      "ENS",
      "Centrale",
      "Mines",
      "CCINP",
      "E3A",
   ];

   const [tabIndex, setTabIndex] = useState(
      allTabs.map((elt) => slugify(elt).toLowerCase()).indexOf(concours)
   );

   const handleTabsChange = (index: number) => {
      const slugifiedTabs = allTabs.map((tab) => slugify(tab).toLowerCase());
      const baseUrl = `/statistiques/${filiere}`;
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
               width='100%'
               variant='enclosed'
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
                        {tab !== "Générale" && (
                           <Table schools={schools as ISchool[]} />
                        )}
                     </TabPanel>
                  ))}
               </TabPanels>
            </Tabs>
         </main>
      </>
   );
};
export const getStaticPaths: GetStaticPaths = async () => {
   const filieres = ["mp"];
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
               filiere,
               concours: section,
            },
         });
      }
   }
   return {
      paths,
      fallback: false,
   };
};
interface IProps {
   schools: ISchool[];
}
export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
   const filiere = params?.filiere as string;
   const concours = params?.concours as string;
   const res = await fetch(
      `${process.env.HOST}/api/schools?annee=${2021}&filiere=${filiere}`
   );
   const schools: ISchool[] = await res.json();
   return {
      props: { schools },
   };
};
export default Statistiques;

