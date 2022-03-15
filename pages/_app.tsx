// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectAuth } from "../store/selectors";
import store from "../store/store";
import jwt_decode from "jwt-decode";
import { logout, setCurrentUser } from "../store/slices/auth";
import jwt from "jsonwebtoken";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
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

			console.log("token avant vérification validdité :", token);
			if (token.exp < currentTime) {
				console.log("useEffect");
				localStorage.removeItem("jwtToken");
				store.dispatch(logout());
			} else {
				// ? Si le token est valide, on mets enb place la session de l'utilisateur
				const user = {
					id: token._id,
					email: token.email,
					name: token.name,
				};
				store.dispatch(setCurrentUser(user));
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
}

export default MyApp;
