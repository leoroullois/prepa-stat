import { Heading, Text, useColorMode } from "@chakra-ui/react";
import { selectAuth } from "@store/selectors";
import Link from "next/link";
import { useSelector } from "react-redux";

const DashboardIntro = () => {
   const {colorMode} = useColorMode();
   const darkMode = colorMode === "dark";
   const auth = useSelector(selectAuth);
   return (
      <>
         <Heading as='h2' size='lg' marginY={5}>
            👋 Content de vous revoir {auth.user.name} !
         </Heading>
         <Text
            color={`gray.${darkMode ? 300 : 700}`}
            fontSize={18}
            textAlign='justify'
            lineHeight={2}
         >
            Ici vous allez pouvoir accéder à vos écoles favorites et les classer
            par ordre de préférence de façon à créer votre liste de voeux ! Vous
            pouvez aussi les supprimer. Bien sûre, il n&apos;y a rien
            d&apos;officiel et il faudra reporter vos choix sur{" "}
            <Link href='https://www.scei-concours.fr/'>
               <a target='_blank'>SCEI</a>
            </Link>{" "}
            le moment venu. En ajoutant des écoles dans vos favoris, cela nous
            permet d&apos;exploiter les données de votre compte pour créer des
            statistiques et vous permettre d&apos;affiner vos choix.
         </Text>
         <Text color={`gray.${darkMode ? 300 : 700}`} fontSize={18}>
            Vous pouvez aussi modifier votre mot de passe, votre nom
            d&apos;utilisateur, filière, supprimer votre compte et enfin
            réinitialiser vos favoris.
         </Text>
      </>
   );
};

export default DashboardIntro;

