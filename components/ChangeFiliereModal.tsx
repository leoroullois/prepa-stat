import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
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
   Radio,
   RadioGroup,
   Stack,
   useToast,
} from "@chakra-ui/react";
import { selectAuth, selectDarkMode, selectUser } from "@store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { changeFiliere, changePassword } from "@store/slices/auth";
import { userInfo } from "os";
import { AppDispatch } from "@store/store";

interface IProps {
   isOpen: boolean;
   onClose: () => void;
}
const ChangeFiliereModal: FC<IProps> = ({ isOpen, onClose }) => {
   const dispatch = useDispatch<AppDispatch>();
   const auth = useSelector(selectAuth);
   const user = useSelector(selectUser);
   const toast = useToast();

   const [filiere, setFiliere] = useState(user.filiere);

   const handleFiliere: ChangeEventHandler<HTMLInputElement> = async (e) => {
      setFiliere(e.target.value.toUpperCase());
   };
   const handleChangeFiliere: MouseEventHandler = async (e) => {
      if (auth.isAuthenticated) {
         try {
            await dispatch(
               changeFiliere({
                  userId: auth.user._id,
                  filiere,
               })
            ).unwrap();
            toast({
               description: "Votre filière a bien été changée.",
               status: "success",
               duration: 5000,
               isClosable: true,
            });
            onClose();
         } catch (err) {
            toast({
               title: "Erreur",
               description:
                  "Une erreur est survenue lors du changement de filière.",
               status: "error",
               duration: 5000,
               isClosable: true,
            });
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
            <ModalHeader>Changer de filière</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
               <RadioGroup onChange={setFiliere} value={filiere}>
                  <Stack
                     direction='column'
                     justifyContent='center'
                     alignItems='center'
                  >
                     <Radio value='MP' isRequired>
                        MP
                     </Radio>
                     <Radio value='PC' isRequired>
                        PC
                     </Radio>
                     <Radio value='PSI' isRequired>
                        PSI
                     </Radio>
                     <Radio value='PT' isRequired>
                        PT
                     </Radio>
                  </Stack>
               </RadioGroup>
            </ModalBody>
            <Divider marginY={3} />
            <ModalFooter>
               <Button onClick={onClose} marginRight={5}>
                  Fermer
               </Button>
               <Button onClick={handleChangeFiliere} bgColor='green.500'>
                  Changer de nom de filière
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
};

export default ChangeFiliereModal;

