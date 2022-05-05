import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import {
   Button,
   Divider,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Radio,
   RadioGroup,
   Stack,
   useToast,
} from "@chakra-ui/react";
import { selectAuth, selectUser } from "@store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
   changeFiliere,
   changeName,
   changePassword,
   setCurrentUser,
} from "@store/slices/auth";
import { userInfo } from "os";
import { AppDispatch } from "@store/store";
import { MdDriveFileRenameOutline } from "react-icons/md";

interface IProps {
   isOpen: boolean;
   onClose: () => void;
}
const ChangeNameModal: FC<IProps> = ({ isOpen, onClose }) => {
   const dispatch = useDispatch<AppDispatch>();
   const auth = useSelector(selectAuth);
   const user = useSelector(selectUser);
   const toast = useToast();

   const [name, setName] = useState("");

   const handleChangeName: MouseEventHandler = async (e) => {
      if (auth.isAuthenticated) {
         try {
            await dispatch(
               changeName({
                  userId: auth.user._id,
                  name,
               })
            ).unwrap();
            dispatch(setCurrentUser({ ...auth.user, id: auth.user._id, name }));
            toast({
               description: "Votre nom d'utilisateur a bien été changée.",
               status: "success",
               duration: 5000,
               isClosable: true,
            });
            onClose();
         } catch (err) {
            toast({
               title: "Erreur",
               description:
                  "Une erreur est survenue lors du changement de nom d'utilisateur.",
               status: "error",
               duration: 5000,
               isClosable: true,
            });
         }
      } else {
         console.log("You need to be logged in to do that");
         toast({
            description:
               "Vous devez être connecté pour effectuer cette opération.",
            status: "error",
            duration: 5000,
            isClosable: true,
         });
      }
   };
   return (
      <Modal onClose={onClose} size='lg' isOpen={isOpen}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Changer de nom d&apos;utilisateur</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
               <FormLabel htmlFor='name'>Nom d&apos;utilisateur</FormLabel>
               <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                     <MdDriveFileRenameOutline />
                  </InputLeftElement>
                  <Input
                     type='text'
                     id='name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder='John Doe'
                  />
               </InputGroup>
            </ModalBody>
            <Divider marginY={3} />
            <ModalFooter>
               <Button onClick={onClose} marginRight={5}>
                  Fermer
               </Button>
               <Button onClick={handleChangeName} colorScheme="green">
                  Changer de nom de nom d&apos;utilisateur
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default ChangeNameModal;

