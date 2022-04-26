import { FC, MouseEventHandler, useState } from "react";
import {
   Button,
   Divider,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useToast,
} from "@chakra-ui/react";
import { selectAuth, selectDarkMode } from "@store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@store/slices/auth";
import { userInfo } from "os";

interface IProps {
   isOpen: boolean;
   onClose: () => void;
}
const ResetPasswordModel: FC<IProps> = ({ isOpen, onClose }) => {
   const dispatch = useDispatch();
   const auth = useSelector(selectAuth);
   const toast = useToast();
   const [show, setShow] = useState({
      currPassword: false,
      newPassword: false,
      confirmPassword: false,
   });
   const [passwords, setPasswords] = useState({
      currPassword: "",
      newPassword: "",
      confirmPassword: "",
   });
   const handleChangePassword: MouseEventHandler = async (e) => {
      console.log("changer le mot de passe");
      if (auth.isAuthenticated) {
         if (
            passwords.currPassword === "" ||
            passwords.newPassword === "" ||
            passwords.confirmPassword === ""
         ) {
            console.log("empty");
            toast({
               description: "L'un des champs n'est pas renseigné.",
               status: "error",
               duration: 5000,
               isClosable: true,
            });
         } else {
            if (passwords.newPassword === passwords.confirmPassword) {
               dispatch(
                  changePassword({
                     userId: auth.user._id,
                     toast,
                     onClose,
                     currPassword: passwords.currPassword,
                     newPassword: passwords.newPassword,
                     confirmPassword: passwords.confirmPassword,
                  })
               );
               
            } else {
               console.log("Your passwords don't match");
               toast({
                  description:
                     "Vous devez confirmer votre nouveau mot de passe.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
               });
            }
         }
      } else {
         console.log("You need to be logged in to do that");
         toast({
            description:
               "Vous devez être connecter pour effectuer cette opération.",
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      }
   };
   return (
      <Modal onClose={onClose} size='lg' isOpen={isOpen}>
         <ModalOverlay />
         <ModalContent bgColor='gray.800'>
            <ModalHeader>Changer de mot de passe</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
               <FormLabel htmlFor='curr-password'>
                  Entrez votre mot de passe actuel
               </FormLabel>
               <InputGroup size='md'>
                  <Input
                     pr='4.5rem'
                     id='curr-password'
                     type={show.currPassword ? "text" : "password"}
                     value={passwords.currPassword}
                     onChange={(e) =>
                        setPasswords({
                           ...passwords,
                           currPassword: e.target.value,
                        })
                     }
                     placeholder='Mot de passe actuel'
                  />
                  <InputRightElement width='4.5rem'>
                     <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() =>
                           setShow({
                              ...show,
                              currPassword: !show.currPassword,
                           })
                        }
                     >
                        {show.currPassword ? "Hide" : "Show"}
                     </Button>
                  </InputRightElement>
               </InputGroup>

               <FormLabel htmlFor='new-password' marginTop={5}>
                  Entrez votre nouveau mot de passe
               </FormLabel>
               <InputGroup size='md'>
                  <Input
                     pr='4.5rem'
                     id='new-password'
                     type={show.newPassword ? "text" : "password"}
                     value={passwords.newPassword}
                     onChange={(e) =>
                        setPasswords({
                           ...passwords,
                           newPassword: e.target.value,
                        })
                     }
                     placeholder='Nouveau mot de passe'
                  />
                  <InputRightElement width='4.5rem'>
                     <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() =>
                           setShow({
                              ...show,
                              newPassword: !show.newPassword,
                           })
                        }
                     >
                        {show.newPassword ? "Hide" : "Show"}
                     </Button>
                  </InputRightElement>
               </InputGroup>

               <FormLabel htmlFor='confirm-password' marginTop={5}>
                  Confirmez votre nouveau mot de passe
               </FormLabel>
               <InputGroup size='md'>
                  <Input
                     pr='4.5rem'
                     id='confirm-password'
                     type={show.confirmPassword ? "text" : "password"}
                     value={passwords.confirmPassword}
                     onChange={(e) =>
                        setPasswords({
                           ...passwords,
                           confirmPassword: e.target.value,
                        })
                     }
                     placeholder='Confirmez votre nouveau mot de passe'
                  />
                  <InputRightElement width='4.5rem'>
                     <Button
                        h='1.75rem'
                        size='sm'
                        onClick={() =>
                           setShow({
                              ...show,
                              confirmPassword: !show.confirmPassword,
                           })
                        }
                     >
                        {show.confirmPassword ? "Hide" : "Show"}
                     </Button>
                  </InputRightElement>
               </InputGroup>
            </ModalBody>
            <Divider marginY={3} />
            <ModalFooter>
               <Button onClick={onClose} marginRight={5}>
                  Fermer
               </Button>
               <Button onClick={handleChangePassword} bgColor='red.500'>
                  Changer de mot de passe
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default ResetPasswordModel;

