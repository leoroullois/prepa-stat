import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { rememberAction, emailAction, passwordAction } from "./action";
export interface ILoginState {
	email: string;
	password: string;
	remember: boolean;
}
interface ILoginProps {
	writeEmail: (pInput: string) => void;
	writePassword: (pInput: string) => void;
	rememberMe: () => void;
	login?: any;
}
class Presentational extends React.Component<ILoginProps, ILoginState> {
	constructor(props: ILoginProps) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.type === "email") {
			this.props.writeEmail(e.target.value);
		} else if (e.target.type === "password") {
			this.props.writePassword(e.target.value);
		} else if (e.target.type === "checkbox") {
			this.props.rememberMe();
		}
	}
	render() {
		return (
			<main id='login'>
				<h1>Se connecter</h1>
				<h2>Content de vous revoir !</h2>
				<form action='' id='login-form'>
					<label htmlFor='login-email' id='login-email-label'>
						Email
					</label>
					<input
						type='email'
						name='Email'
						id='login-email'
						placeholder='Entrez votre email'
						required
						value={this.props.login.email}
						onChange={this.handleChange}
					/>
					<label htmlFor='login-password' id='login-password-label'>
						Mot de passe
					</label>
					<input
						type='password'
						name='Password'
						id='login-password'
						placeholder='Entrez votre mot de passe'
						required
						value={this.props.login.password}
						onChange={this.handleChange}
					/>
					<div id='login-remember-forgot-container'>
						<div id='login-remember-container'>
							<input
								type='checkbox'
								name='Remember'
								id='login-remember'
								onChange={this.handleChange}
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
					<button id='login-with-google'>Connexion avec google</button>
				</form>
				<div id='no-account'>
					<p>Pas de compte ?</p>
					<Link to='/s-enregistrer'>S'enregistrer</Link>
				</div>
			</main>
		);
	}
}
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar: state.navBar,
		login: state.login,
	};
};
const mapDispatchToProps = (dispatch: AppDispatch): ILoginProps => {
	return {
		writeEmail: (pInput: string) => dispatch(emailAction(pInput)),
		writePassword: (pInput: string) => dispatch(passwordAction(pInput)),
		rememberMe: () => dispatch(rememberAction()),
	};
};
export const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(Presentational);
