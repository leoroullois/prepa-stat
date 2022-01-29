import React from "react";
/**React-router */
import { Link } from "react-router-dom";
/**CSS */
import "./register.css";
/**Redux */
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { usernameAction, emailAction, passwordAction } from "./action";
export interface IRegisterProps {
	writeUsername: (pInput: string) => void;
	writeEmail: (pInput: string) => void;
	writePassword: (pInput: string) => void;
	register?: any;
}
export interface IRegisterState {
	username: string;
	email: string;
	password: string;
}
class Presentational extends React.Component<IRegisterProps, IRegisterState> {
	constructor(props: IRegisterProps) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.type === "email") {
			this.props.writeEmail(e.target.value);
		} else if (e.target.type === "password") {
			this.props.writePassword(e.target.value);
		} else if (e.target.type === "text") {
			this.props.writeUsername(e.target.value);
		}
	}
	render() {
		return (
			<main id='register'>
				<h1>S'enregistrer</h1>
				<h2>Bienvenue sur PrépaStat !</h2>
				<form action='/s-enregistrer' method="post" id='register-form'>
					<label htmlFor='register-username' id='username'>
						Nom d'utilisateur
					</label>
					<input
						type='text'
						name="Nom d'utilisateur"
						id='register-username'
						required
						value={this.props.register.username}
						onChange={this.handleChange}
						placeholder="Entrez votre nom d'utilisateur"
					/>
					<label htmlFor='register-email' id='register-email-label'>
						Email
					</label>
					<input
						type='email'
						name='Email'
						id='register-email'
						placeholder='Entrez votre email'
						required
						value={this.props.register.email}
						onChange={this.handleChange}
					/>
					<label htmlFor='register-password' id='register-password-label'>
						Mot de passe
					</label>
					<input
						type='password'
						name='Password'
						id='register-password'
						placeholder='Entrez votre mot de passe'
						required
						value={this.props.register.password}
						onChange={this.handleChange}
					/>
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
	}
}

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		register: state.register,
	};
};
const mapDispatchToProps = (dispatch: AppDispatch): IRegisterProps => {
	return {
		writeUsername: (pInput: string) => dispatch(usernameAction(pInput)),
		writeEmail: (pInput: string) => dispatch(emailAction(pInput)),
		writePassword: (pInput: string) => dispatch(passwordAction(pInput)),
	};
};
export const Register = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
