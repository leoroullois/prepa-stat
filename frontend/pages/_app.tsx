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

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	useEffect(() => {
		// ? Récupère le token dans le localStorage
		const encoded = localStorage.getItem("jwtToken") ?? "";
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
				// router.push("/se-connecter");
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
				// router.push("/se-connecter");
			}
		}
		console.log("fin useEffect");
	}, []);

	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
