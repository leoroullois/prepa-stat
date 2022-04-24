// * Next
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

// * React
import {
   ChangeEventHandler,
   FormEventHandler,
   MouseEventHandler,
   useEffect,
   useState,
} from "react";
// * UI
import { Button, Divider, Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Fade } from "react-awesome-reveal";
// * components
import Password from "@components/Auth/password";
import Username from "@components/Auth/username";
// * Styles
import scss from "@scss/login.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@store/slices/auth";
import { selectAuth } from "@store/selectors";
import Email from "@components/Auth/email";
import { close } from "@store/slices/sideNav";
import AuthProviderBtn from "@components/Auth/AuthProviderBtn";
import google from "/public/google.svg";
import github from "/public/github.svg";

const Login: NextPage = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { isAuthenticated } = useSelector(selectAuth);

   const [clicked, setClicked] = useState(false);
   const [serverError, setServerError] = useState("");
   const [password, setPassword] = useState<string>("");
   const handlePassword: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setPassword(elt.value);
   };
   const [email, setEmail] = useState<string>("");
   const handleEmail: ChangeEventHandler = (e) => {
      const elt = e.target as HTMLInputElement;
      setEmail(elt.value);
   };

   const [remember, setRemember] = useState(false);
   const handlePrevent: FormEventHandler = (e) => e.preventDefault();
   const handleSubmit: MouseEventHandler = async (e) => {
      e.preventDefault();
      dispatch(
         login({
            email,
            password,
            remember: remember,
         })
      );
   };
   useEffect(() => {
      if (isAuthenticated) {
         router.push("/dashboard");
      }
   }, [router, isAuthenticated]);

   const handleClick: MouseEventHandler = (e) => {
      dispatch(close());
   };

   return (
      <>
         <Head>
            <title>Se connecter - PrépaStat</title>
         </Head>
         <main className={scss.login}>
            <Fade>
               <form
                  action='/api/auth/login'
                  method='POST'
                  className={scss.form}
                  onSubmit={handlePrevent}
               >
                  <Fade cascade duration={500}>
                     <Heading as='h1'>Content de vous revoir !</Heading>
                     <Divider marginY={3} />
                     {/* <div className={scss.bar}></div> */}

                     <Email
                        email={email}
                        handleEmail={handleEmail}
                        clicked={clicked}
                     />
                     <Password
                        password={password}
                        handlePassword={handlePassword}
                        clicked={clicked}
                     />
                     <div className={scss["remember--container"]}>
                        <input
                           type='checkbox'
                           name='remembebr'
                           id='remember'
                           checked={remember}
                           onChange={() => setRemember(!remember)}
                        />
                        <label htmlFor='remember'>Se souvenir de moi</label>
                     </div>
                     <Button
                        className={scss.submit}
                        width='100%'
                        rightIcon={<IoArrowForwardSharp />}
                        type='submit'
                        onClick={handleSubmit}
                     >
                        Se connecter
                     </Button>
                     <span className={scss.link}>
                        <p>Ou&nbsp;</p>
                        <NextLink href='/s-enregistrer' passHref>
                           <Link>créer un compte</Link>
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

export default Login;

