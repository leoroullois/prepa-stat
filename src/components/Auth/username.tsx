import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC } from "react";
import { IoPerson } from "react-icons/io5";

interface IProps {
   handleUsername: ChangeEventHandler;
   username: string;
   clicked: boolean;
}
const Username: FC<IProps> = ({ handleUsername, username, clicked }) => {
   const usernameValidator = (username: string) => {
      return username !== "";
   };
   return (
      <FormControl
         isRequired
         isInvalid={!usernameValidator(username) && clicked}
      >
         <FormLabel htmlFor='username'>Prénom</FormLabel>
         <InputGroup>
            <InputLeftElement pointerEvents='none'>
               <IoPerson color='gray.500' />
            </InputLeftElement>
            <Input
               type='text'
               id='username'
               value={username}
               onChange={handleUsername}
               placeholder='Entrez votre prénom'
            />
         </InputGroup>
         {!usernameValidator(username) && (
            <FormErrorMessage>Username is required.</FormErrorMessage>
         )}
      </FormControl>
   );
};

export default Username;
