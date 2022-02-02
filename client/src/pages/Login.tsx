import React, {
	FormEventHandler,
	useState,
	useEffect,
} from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { loginUser } from "../store/thunks/login";
import google from "../assets/google.svg";
import github from "../assets/github.svg";
import { AuthProviderBtn } from "../components/AuthProviderBtn";
const Presentational: React.FC<any> = ({ loginUser, auth }) => {
	const navigate = useNavigate();
	const [state, setState]: [ILoginState, any] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		loginUser(state);
	};
	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/dashboard");
		}
	}, [auth.isAuthenticated, navigate]);
	return (
		<main id='login'>
			<h1>Se connecter</h1>
			<h2>Content de vous revoir !</h2>
			<form
				action='/se-connecter'
				method='post'
				id='login-form'
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
				<div id='login-remember-forgot-container'>
					<div id='login-remember-container'>
						<input
							type='checkbox'
							name='remember'
							id='login-remember'
							onChange={handleChange}
						/>
						<label htmlFor='login-remember'>Souvenez-vous de moi.</label>
					</div>
					<Link id='login-forgot' to='mot-de-passe-oublie'>
						Mot de passe oublié
					</Link>
				</div>
				<button type='submit' id='login-submit'>
					Connexion
				</button>
				<AuthProviderBtn svg={google} provider="Google" />
				<AuthProviderBtn svg={github} provider="Github" />
			</form>
			<div id='no-account'>
				<p>Pas de compte ?</p>
				<Link to='/s-enregistrer'>S'enregistrer</Link>
			</div>
		</main>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState): ILoginProps => {
	return {
		auth: state.auth,
		errors: state.errors,
	};
};
const dispatchToProps = {
	loginUser,
};

export const Login = connect(mapStateToProps, dispatchToProps)(Presentational);
