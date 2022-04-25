import { Heading, Text } from "@chakra-ui/react";
import { selectAuth, selectDarkMode } from "@store/selectors";
import Link from "next/link";
import { useSelector } from "react-redux";

const DashboardIntro = () => {
   const darkMode = useSelector(selectDarkMode);
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
            Ici vous allez pouvoir accéder à vos écoles favorites et les trier
            de façon à créer votre liste de voeux ! Vous pouvez aussi les
            supprimer. Bien sûre, il n&apos;y a rien d&apos;officiel et il
            faudra reporter vous choix sur{" "}
            <Link href='https://www.scei-concours.fr/'>
               <a target='_blank'>SCEI</a>
            </Link>{" "}
            le moment venu. En ajoutant des écoles dans vos favoris, cela nous
            permet d&apos;exploiter les données de votre compte pour créer des
            statistiques et vous permettre d&apos;affiner vos choix.
         </Text>
         <Text color={`gray.${darkMode ? 300 : 700}`} fontSize={18}>
            [A venir] Vous pouvez aussi modifier votre mot de passe, et
            supprimer votre compte.
         </Text>
      </>
   );
};

export default DashboardIntro;

