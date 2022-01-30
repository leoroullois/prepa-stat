import React, { FormEventHandler, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { RootState } from "../../store";
import { loginUser } from "./action";
export interface ILoginState {
	email: string;
	password: string;
	remember: boolean;
	errors: any;
}
// interface ILoginProps {
// 	login?: any;
// }
const Presentational = (props: any) => {
	let navigate = useNavigate();
	const [state, setState]: [ILoginState, any] = useState({
		email: "",
		password: "",
		remember: false,
		errors: {},
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const User = {
			email: props.login.email,
			password: props.login.password,
		};
		navigate("/simulateur");
		console.log(User);
	};

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
					value={props.login.email}
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
					value={props.login.password}
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
				<button id='login-with-google'>Connexion avec google</button>
			</form>
			<div id='no-account'>
				<p>Pas de compte ?</p>
				<Link to='/s-enregistrer'>S'enregistrer</Link>
			</div>
		</main>
	);
};
// class Presentational extends React.Component<ILoginProps, ILoginState> {
// 	constructor(props: ILoginProps) {
// 		super(props);
// 		this.handleChange = this.handleChange.bind(this);
// 	}
// 	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
// 		if (e.target.type === "email") {
// 			this.props.writeEmail(e.target.value);
// 		} else if (e.target.type === "password") {
// 			this.props.writePassword(e.target.value);
// 		} else if (e.target.type === "checkbox") {
// 			this.props.rememberMe();
// 		}
// 	}
// 	private handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
// 		e.preventDefault();
// 		const User = {
// 			email: this.props.login.email,
// 			password: this.props.login.password,
// 		};
// 		console.log(User);
// 	};
// 	render() {
// 		return (
// 			<main id='login'>
// 				<h1>Se connecter</h1>
// 				<h2>Content de vous revoir !</h2>
// 				<form
// 					action='/se-connecter'
// 					method='post'
// 					id='login-form'
// 					onSubmit={this.handleSubmit}
// 				>
// 					<label htmlFor='login-email' id='login-email-label'>
// 						Email
// 					</label>
// 					<input
// 						type='email'
// 						name='email'
// 						id='login-email'
// 						placeholder='Entrez votre email'
// 						required
// 						value={this.props.login.email}
// 						onChange={this.handleChange}
// 					/>
// 					<label htmlFor='login-password' id='login-password-label'>
// 						Mot de passe
// 					</label>
// 					<input
// 						type='password'
// 						name='password'
// 						id='login-password'
// 						placeholder='Entrez votre mot de passe'
// 						required
// 						value={this.props.login.password}
// 						onChange={this.handleChange}
// 					/>
// 					<div id='login-remember-forgot-container'>
// 						<div id='login-remember-container'>
// 							<input
// 								type='checkbox'
// 								name='remember'
// 								id='login-remember'
// 								onChange={this.handleChange}
// 							/>
// 							<label htmlFor='login-remember'>Souvenez-vous de moi.</label>
// 						</div>
// 						<Link id='login-forgot' to='mot-de-passe-oublie'>
// 							Mot de passe oublié
// 						</Link>
// 					</div>
// 					<button type='submit' id='login-submit'>
// 						Connexion
// 					</button>
// 					<button id='login-with-google'>Connexion avec google</button>
// 				</form>
// 				<div id='no-account'>
// 					<p>Pas de compte ?</p>
// 					<Link to='/s-enregistrer'>S'enregistrer</Link>
// 				</div>
// 			</main>
// 		);
// 	}
// }
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		leaderboard: state.leaderboard,
		subNav: state.subNav,
		navBar: state.navBar,
	};
};
const dispatchToProps = {
	loginUser,
};

export const Login = connect(mapStateToProps, dispatchToProps)(Presentational);
