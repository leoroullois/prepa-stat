import {
   Button,
   FormControl,
   FormErrorMessage,
   FormHelperText,
   FormLabel,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
} from "@chakra-ui/react";
import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import { IoShieldHalfSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
interface IProps {
   handlePassword: ChangeEventHandler;
   password: string;
   clicked: boolean;
   text?: string;
}

const Password: FC<IProps> = ({ password, handlePassword, text, clicked }) => {
   const [show, setShow] = useState(false);

   const id = uuidv4();

   const handleClick: MouseEventHandler = (e) => {
      setShow((show) => !show);
   };

   const passwordValidator = (password: string): boolean => {
      return password.length >= 8;
   };

   return (
      <FormControl
         isRequired
         isInvalid={!passwordValidator(password) && clicked}
      >
         <FormLabel htmlFor={id}>{text ?? "Mot de passe"}</FormLabel>
         <InputGroup>
            <InputLeftElement pointerEvents='none'>
               <IoShieldHalfSharp color='gray.500' />
            </InputLeftElement>
            <Input
               type={show ? "text" : "password"}
               id={id}
               value={password}
               onChange={handlePassword}
               placeholder='Entrez votre mot de passe'
            />
            <InputRightElement width='4.5rem'>
               <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? "Cacher" : "Voir"}
               </Button>
            </InputRightElement>
         </InputGroup>
         {!passwordValidator(password) && (
            <FormHelperText>
               Votre mot de passe doit contenir 8 caractères minimum.
            </FormHelperText>
         )}
      </FormControl>
   );
};

export default Password;
