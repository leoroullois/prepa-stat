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
import isEmpty from "is-empty";

const App = ({ Component, pageProps }: AppProps) => {
   // const { query } = useRouter();
   useEffect(() => {
      let encoded = localStorage.getItem("jwtToken") ?? "";
      if (isEmpty(encoded)) {
         if (!store.getState().auth.isAuthenticated) {
            store.dispatch(logout());
         }
      } else {
         const token = jwt_decode(encoded) as IToken;
         const currentTime = Date.now() / 1000; // to get in milliseconds
         if (token.exp < currentTime) {
            localStorage.removeItem("jwtToken");
            store.dispatch(logout());
         } else {
            store.dispatch(setCurrentUserById(token._id));
         }
      }
   }, []);
   return (
      <ChakraProvider>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </ChakraProvider>
   );
};
const MyApp = ({ Component, pageProps }: AppProps) => {
   return (
      <Provider store={store}>
         <App {...pageProps} Component={Component} />
      </Provider>
   );
};
export default MyApp;

