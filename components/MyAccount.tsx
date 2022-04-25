import {
   Button,
   Heading,
   ListItem,
   Text,
   UnorderedList,
} from "@chakra-ui/react";
import { selectAuth, selectDarkMode } from "@store/selectors";
import React from "react";
import { useSelector } from "react-redux";
import scss from "@scss/myaccount.module.scss";
import classNames from "classnames";
const MyAccount = () => {
   const auth = useSelector(selectAuth);
   const darkMode = useSelector(selectDarkMode);
   return (
      <section>
         <Heading as='h2' size='lg' marginBottom={3}>
            Mon compte
         </Heading>
         <UnorderedList>
            <ListItem fontSize={18} marginBottom={5}>
               <Text>Nom d&apos;utilisateur : {auth.user.name}</Text>
               <button
                  className={classNames({
                     [scss["btn--dark"]]: darkMode,
                     [scss["btn--light"]]: !darkMode,
                  })}
               >
                  Changer de nom d&apos;utilisateur
               </button>
            </ListItem>
            <ListItem fontSize={18} marginBottom={5}>
               Email : <span className={scss["email"]}>{auth.user.email}</span>
            </ListItem>
            <ListItem marginTop={3} fontSize={18} marginBottom={5}>
               <Text>Filière : MP</Text>
               <button
                  className={classNames({
                     [scss["btn--dark"]]: darkMode,
                     [scss["btn--light"]]: !darkMode,
                  })}
               >
                  Modifier ma filière
               </button>
            </ListItem>
            <ListItem marginTop={3} fontSize={18} marginBottom={5}>
               <Text>Mot de passe:</Text>
               <button
                  className={classNames({
                     [scss["btn--dark"]]: darkMode,
                     [scss["btn--light"]]: !darkMode,
                  })}
               >
                  Changer de mot de passe
               </button>
            </ListItem>
            <ListItem fontSize={18} marginBottom={5}>
               <Text>Supprimer mon compte</Text>
               <button className={scss["btn--delete"]}>Supprimer</button>
            </ListItem>
         </UnorderedList>
      </section>
   );
};

export default MyAccount;

