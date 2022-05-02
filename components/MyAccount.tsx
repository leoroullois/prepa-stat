import {
   Button,
   Divider,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputRightElement,
   ListItem,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   UnorderedList,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { selectAuth, selectDarkMode } from "@store/selectors";
import React, { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scss from "@scss/myaccount.module.scss";
import classNames from "classnames";
import { resetFavorites } from "@store/slices/favorites";
import ResetPasswordModal from "./ResetPasswordModal";
import { AppDispatch } from "@store/store";

const MyAccount = () => {
   const dispatch = useDispatch<AppDispatch>();
   const toast = useToast();

   const {
      isOpen: isPasswordOpen,
      onOpen: onPasswordOpen,
      onClose: onPasswordClose,
   } = useDisclosure();

   const auth = useSelector(selectAuth);
   const darkMode = useSelector(selectDarkMode);

   const handleResetFavorites: MouseEventHandler = async (e) => {
      if (auth.user) {
         try {
            const res = await dispatch(resetFavorites(auth.user._id)).unwrap();
            toast({
               title: "Favoris supprimés.",
               description: "Nous venons de supprimer vos favoris.",
               status: "success",
               duration: 5000,
               isClosable: true,
            });
         } catch (err) {
            toast({
               title: "Favoris non supprimés.",
               description:
                  "Une erreur est survenue lors de la suppression de vos favoris.",
               status: "error",
               duration: 5000,
               isClosable: true,
            });
            console.log(err);
         }
      } else {
         console.log("You need to be logged in to do that");
         toast({
            title: "Erreur.",
            description: "Vous devez être connecté pour effectuer cela.",
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      }
   };

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
                  onClick={() => onPasswordOpen()}
               >
                  Changer de mot de passe
               </button>
               <ResetPasswordModal
                  onClose={onPasswordClose}
                  isOpen={isPasswordOpen}
               />
            </ListItem>
            <ListItem fontSize={18} marginBottom={5}>
               <Text>Réinitialiser mes favoris</Text>
               <button
                  className={scss["btn--delete"]}
                  onClick={handleResetFavorites}
               >
                  Réinitialiser
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

