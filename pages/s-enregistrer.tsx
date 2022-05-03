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
   FormErrorMessage,
   Heading,
   Link,
} from "@chakra-ui/react";
import { IoArrowForwardSharp } from "react-icons/io5";
// * Components
import Email from "@components/Auth/email";
import Password from "@components/Auth/password";
import Username from "@components/Auth/username";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { register } from "@store/slices/auth";
import { AppDispatch } from "@store/store";

const Register: NextPage = () => {
   const dispatch = useDispatch<AppDispatch>();
   const router = useRouter();
   const { isAuthenticated } = useSelector(selectAuth);

   const [clicked, setClicked] = useState(false);
   const [serverError, setServerError] = useState<string>("");

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

   const handlePrevent: FormEventHandler = (e) => e.preventDefault();

   const handleSubmit: MouseEventHandler = async (e) => {
      e.preventDefault();
      const state = {
         name: username,
         email,
         password1,
         password2,
      };
      console.log("USER :", state);
      dispatch(register(state));
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
                        text='Réécrivrez votre mot de passe'
                        clicked={clicked}
                     />
                     <Button
                        className={scss.submit}
                        width='100%'
                        rightIcon={<IoArrowForwardSharp />}
                        type='submit'
                        onClick={handleSubmit}
                     >
                        S&apos;enregistrer
                     </Button>
                     <span className={scss.link}>
                        <p>Ou&nbsp;</p>
                        <NextLink href='/se-connecter' passHref>
                           <Link>se connecter</Link>
                        </NextLink>
                     </span>
                  </Fade>
                  {serverError && (
                     <span className={scss.serverError}>• {serverError}</span>
                  )}
               </form>
            </Fade>
         </main>
      </>
   );
};

export default Register;

