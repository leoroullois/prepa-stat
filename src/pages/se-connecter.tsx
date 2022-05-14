import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
    ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState
} from 'react';
import { Fade } from 'react-awesome-reveal';
import { IoArrowForwardSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button, Checkbox, Divider, Heading, Link, ListItem, UnorderedList
} from '@chakra-ui/react';
import Email from '@components/Auth/email';
import Password from '@components/Auth/password';
import scss from '@scss/login.module.scss';
import { selectAuth } from '@store/selectors';
import { login } from '@store/slices/auth';
import { close } from '@store/slices/sideNav';
import { AppDispatch } from '@store/store';

const Login: NextPage = () => {
   const router = useRouter();
   const dispatch = useDispatch<AppDispatch>();
   const { isAuthenticated } = useSelector(selectAuth);

   const [clicked, setClicked] = useState(false);

   const serverError = useSelector(selectAuth).errors;

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
      try {
         await dispatch(
            login({
               email,
               password,
               remember: remember,
            })
         ).unwrap();
      } catch (err) {
         console.log("ERROR : ", err);
      }
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
                        <Checkbox
                           colorScheme='green'
                           checked={remember}
                           onChange={() => setRemember((remember) => !remember)}
                        >
                           Se souvenir de moi
                        </Checkbox>
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

export default Login;

