import type { AppProps } from "next/app";
import "@scss/globals.scss";

import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@components/Layout";
import { IToken } from "@lib/type";
import { logout, setCurrentUserById } from "@store/slices/auth";
import store from "@store/store";

const App = ({ Component, pageProps }: AppProps) => {
   const { query } = useRouter();
   useEffect(() => {
      // ? Récupère le token dans le localStorage
      let encoded = localStorage.getItem("jwtToken") ?? "";
      if (query.token) {
         const token = "Bearer " + query.token;

         const decoded: any = jwt.verify(
            query.token as string,
            process.env.NEXT_PUBLIC_JWT_KEY as string
         );

         if (decoded?._id && decoded?.name && decoded?.email) {
            encoded = token;
         }
      }
      if (encoded) {
         // ? Décode le token pour l'avoir sous la forme IToken
         const token = jwt_decode(encoded) as IToken;
         // ? Vérification de la validité du token :
         // Check for expired token
         const currentTime = Date.now() / 1000; // to get in milliseconds

         if (token.exp < currentTime) {
            localStorage.removeItem("jwtToken");
            store.dispatch(logout());
         } else {
            // ? Si le token est valide, on mets en place la session de l'utilisateur
            const user = {
               id: token._id,
               email: token.email,
            };
            store.dispatch(setCurrentUserById(user.id));
         }
      } else {
         if (!store.getState().auth.isAuthenticated) {
            store.dispatch(logout());
         }
      }
   }, [query.token]);
   return (
      <Provider store={store}>
         <ChakraProvider>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </ChakraProvider>
      </Provider>
   );
};

export default App;

