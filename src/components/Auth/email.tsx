import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC } from "react";
import { IoMail } from "react-icons/io5";

interface IProps {
   handleEmail: ChangeEventHandler;
   email: string;
   clicked: boolean;
}
const Email: FC<IProps> = ({ handleEmail, email, clicked }) => {
   const emailValidator = (email: string): boolean => {
      const regexp = /\S+@\S+\.\S+/;
      return regexp.test(email.toLowerCase());
   };
   return (
      <FormControl isRequired isInvalid={!emailValidator(email) && clicked}>
         <FormLabel htmlFor='email'>Email</FormLabel>
         <InputGroup>
            <InputLeftElement pointerEvents='none'>
               <IoMail color='gray.500' />
            </InputLeftElement>
            <Input
               type='email'
               id='email'
               value={email}
               onChange={handleEmail}
               placeholder='Entrez votre email'
            />
         </InputGroup>
         {!emailValidator(email) && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
         )}
      </FormControl>
   );
};

export default Email;
