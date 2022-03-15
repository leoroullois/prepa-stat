import { FormEventHandler, useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/auth";
import google from "/public/google.svg";
import github from "/public/github.svg";
import scss from "/scss/login.module.scss";
import AuthProviderBtn from "../components/Auth/AuthProviderBtn";
import { selectAuth } from "../store/selectors";
import { useRouter } from "next/router";
import Head from "next/head";

export const fetchApiCall = (url: string, method: string, body = {}) =>
	fetch(url, {
		method,
		body: JSON.stringify(body),
	});

const Login: React.FC<any> = () => {
	const auth = useSelector(selectAuth);
	const router = useRouter();
	const dispatch = useDispatch();

	const [state, setState] = useState<ILoginState>({
		email: "",
		password: "",
		remember: false,
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		dispatch(login(state));
	};
	useEffect(() => {
		if (auth.isAuthenticated) {
			router.push("/dashboard");
		}
	}, [auth.isAuthenticated, router]);

	return (
		<>
			<Head>
				<title>Se connecter - PrépaStat</title>
			</Head>
			<main className={scss["login"]}>
				<h1>Se connecter</h1>
				<h2>Content de vous revoir !</h2>
				<form
					action='/se-connecter'
					method='post'
					className={scss["login-form"]}
					onSubmit={handleSubmit}
				>
					<label htmlFor='login-email' id='login-email-label'>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='login-email'
						placeholder='Entrez votre email'
						required
						value={state.email}
						onChange={handleChange}
					/>
					<label htmlFor='login-password' id='login-password-label'>
						Mot de passe
					</label>
					<input
						type='password'
						name='password'
						id='login-password'
						placeholder='Entrez votre mot de passe'
						required
						value={state.password}
						onChange={handleChange}
					/>
					<div className={scss["login-remember-forgot-container"]}>
						<div className={scss["login-remember-container"]}>
							<input
								type='checkbox'
								name='remember'
								id='login-remember'
								onChange={handleChange}
							/>
							<label htmlFor='login-remember'>Souvenez-vous de moi.</label>
						</div>
						<Link href='/mot-de-passe-oublie'>
							<a className={scss["login-forgot"]}>Mot de passe oublié</a>
						</Link>
					</div>
					<button type='submit' className={scss["login-submit"]}>
						Connexion
					</button>
					<AuthProviderBtn svg={google} provider='Google' />
					<AuthProviderBtn svg={github} provider='Github' />
				</form>
				<div className={scss["no-account"]}>
					<p>Pas de compte ?</p>
					<Link href='/s-enregistrer'>
						<a>S&apos;enregistrer</a>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Login;
