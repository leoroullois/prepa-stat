// * Next
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
// * React
import {
   ChangeEventHandler,
   FormEventHandler,
   MouseEventHandler,
   useEffect,
   useState,
} from "react";
// * UI
import scss from "@scss/register.module.scss";
import { Fade } from "react-awesome-reveal";
import {
   Button,
   Divider,
   Heading,
   Link,
   ListItem,
   Radio,
   RadioGroup,
   Stack,
   UnorderedList,
} from "@chakra-ui/react";
import { IoArrowForwardSharp } from "react-icons/io5";
// * Components
import Email from "@components/Auth/email";
import Password from "@components/Auth/password";
import Username from "@components/Auth/username";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { login, register } from "@store/slices/auth";
import { AppDispatch } from "@store/store";

export interface IServerError {
   message: string;
}
const Register: NextPage = () => {
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();
   const { isAuthenticated } = useSelector(selectAuth);

   const [clicked, setClicked] = useState(false);

   const serverError = useSelector(selectAuth).errors;
   const [email, setEmail] = useState<string>("");
   const handleEmail: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setEmail(elt.value);
   };
   const [username, setUsername] = useState<string>("");
   const handleUsername: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setUsername(elt.value);
   };

   const [password1, setPassword1] = useState<string>("");
   const handlePassword1: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setPassword1(elt.value);
   };
   const [password2, setPassword2] = useState<string>("");
   const handlePassword2: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setPassword2(elt.value);
   };

   const [filiere, setFiliere] = useState("MP");

   const handlePrevent: FormEventHandler = (e) => e.preventDefault();

   const handleSubmit: MouseEventHandler = async (e) => {
      e.preventDefault();
      const user = {
         name: username,
         email,
         filiere,
         password1,
         password2,
      };
      console.log("USER :", user);
      try {
         const res = await dispatch(register(user)).unwrap();
         await dispatch(
            login({ email, password: password1, remember: false })
         ).unwrap();
      } catch (err) {
         console.log("ERROR :", err);
      }
   };

   useEffect(() => {
      if (isAuthenticated) {
         router.push("/dashboard");
      }
   }, [router, isAuthenticated]);

   return (
      <>
         <Head>
            <title>Créer un compte - PrépaStat</title>
         </Head>
         <main className={scss.register}>
            <Fade>
               <form
                  action='/api/auth/register'
                  method='POST'
                  className={scss.form}
                  onSubmit={handlePrevent}
               >
                  <Fade cascade duration={400}>
                     <Heading as='h1' size='xl'>
                        Bienvenue sur PrépaStat !
                     </Heading>
                     <Heading as='h2' size='lg'>
                        Créez vous un compte
                     </Heading>
                     <Divider />
                     {/* <div className={scss.bar}></div> */}
                     <Email
                        email={email}
                        handleEmail={handleEmail}
                        clicked={clicked}
                     />
                     <Username
                        username={username}
                        handleUsername={handleUsername}
                        clicked={clicked}
                     />
                     <Password
                        password={password1}
                        handlePassword={handlePassword1}
                        clicked={clicked}
                     />
                     <Password
                        password={password2}
                        handlePassword={handlePassword2}
                        text='Confirmez votre mot de passe'
                        clicked={clicked}
                     />
                     <Divider marginY={3} />
                     <RadioGroup
                        onChange={setFiliere}
                        value={filiere}
                        defaultValue='MP'
                     >
                        <Stack direction='row'>
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
                     <Divider marginY={3} />
                     <Button
                        className={scss.submit}
                        width='100%'
                        rightIcon={<IoArrowForwardSharp />}
                        type='submit'
                        onClick={handleSubmit}
                     >
                        S&apos;enregistrer
                     </Button>
                     <Divider marginY={3} />
                     <span className={scss.link}>
                        <p>Ou&nbsp;</p>
                        <NextLink href='/se-connecter' passHref>
                           <Link>se connecter</Link>
                        </NextLink>
                     </span>
                  </Fade>
                  {serverError && (
                     <UnorderedList className={scss.serverError}>
                        {serverError.map((elt: any, i: number) => {
                           return <ListItem key={i}>{elt.message}</ListItem>;
                        })}
                     </UnorderedList>
                  )}
               </form>
            </Fade>
         </main>
      </>
   );
};

export default Register;

