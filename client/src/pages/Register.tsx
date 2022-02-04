import  { FormEventHandler, useState, useEffect,FC, ChangeEvent, } from "react";
/**React-router */
import { Link, useNavigate } from "react-router-dom";
/**CSS */
import "../css/register.css";
/**Redux */
import { connect } from "react-redux";
import { RootState } from "../store/store";
import { registerUser } from "../store/thunks/register";
import classnames from "classnames";
interface IProps {
	auth:IAuth;
	errors:IErrors
	registerUser:any;
}
const Presentational: FC<IProps> = ({ registerUser, auth, errors }) => {
	let navigate = useNavigate();
	const [state, setState]: [IRegisterState, any] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	useEffect(() => {
		document.title = "S'enregistrer - PrépaStat";
		if (auth.isAuthenticated) {
			navigate("/");
		}
	}, [auth.isAuthenticated, navigate]);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		registerUser(state, navigate);
	};
	return (
		<main id='register'>
			<h1>S'enregistrer</h1>
			<h2>Bienvenue sur PrépaStat !</h2>
			<form
				action='/s-enregistrer'
				method='post'
				id='register-form'
				onSubmit={handleSubmit}
			>
				<label htmlFor='register-name' id='name'>
					Nom d'utilisateur
				</label>
				<input
					type='text'
					name='name'
					id='register-name'
					className={classnames("", {
						invalid: errors.name,
					})}
					required
					value={state.name}
					onChange={handleChange}
					placeholder="Entrez votre nom d'utilisateur"
				/>
				<span className='red-text'>{errors.name}</span>

				<label htmlFor='register-email' id='register-email-label'>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='register-email'
					className={classnames("", {
						invalid: errors.email,
					})}
					placeholder='Entrez votre email'
					required
					value={state.email}
					onChange={handleChange}
				/>
				<span className='red-text'>{errors.email}</span>
				<label htmlFor='register-password' id='register-password-label'>
					Mot de passe
				</label>
				<input
					type='password'
					name='password'
					id='register-password'
					className={classnames("", {
						invalid: errors.password,
					})}
					placeholder='Entrez votre mot de passe'
					required
					value={state.password}
					onChange={handleChange}
				/>
				<span className='red-text'>{errors.password2}</span>
				<label htmlFor='register-password2' id='register-password2-label'>
					Ressaisissez votre mot de passe
				</label>
				<input
					type='password'
					name='password2'
					id='register-password2'
					className={classnames("", {
						invalid: errors.password2,
					})}
					placeholder='Entrez votre mot de passe'
					required
					value={state.password2}
					onChange={handleChange}
				/>
				<span className='red-text'>{errors.password2}</span>
				<p id='register-password-information'>
					Votre mot de passe doit contenir au moins 8 caractères.
				</p>
				<button type='submit' id='register-submit'>
					Créer un compte
				</button>
			</form>
			<div id='yes-account'>
				<p>Vous avez déjà un compte ?</p>
				<Link to='/se-connecter'>Se connecter</Link>
			</div>
		</main>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
		errors: state.errors,
	};
};
const dispatchToProps = {
	registerUser,
};
export const Register:FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
