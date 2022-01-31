import React, { FormEventHandler, useState } from "react";
/**React-router */
import { Link, useNavigate } from "react-router-dom";
/**CSS */
import "./register.css";
/**Redux */
import { connect } from "react-redux";
import { RootState } from "../../store";
import { registerUser } from "./action";
import classnames from "classnames";

export interface IRegisterProps {
	registerUser: (pInput: any, pNavigate: any) => void;
	register?: any;
}
export interface IRegisterState {
	name: string;
	email: string;
	password: string;
	password2: string;
	errors: any;
}
const Presentational = (props: any) => {
	let navigate = useNavigate();
	const [state, setState]: [IRegisterState, any] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {},
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		const User = {
			name: state.name,
			email: state.email,
			password: state.password,
			password2: state.password2,
		};
		console.log("User :",User);
		props.registerUser(User, navigate);
	};
	const handleClick = () => {
		console.log("ofhrogh");
		navigate("/")
	}
	return (
		<main id='register'>

			<h1 onClick={handleClick}>S'enregistrer</h1>
			<h2>Bienvenue sur PrépaStat !</h2>
			<form
				action='/s-enregistrer'
				method='post'
				id='register-form'
				// onSubmit={handleSubmit}
			>
				<label htmlFor='register-name' id='name'>
					Nom d'utilisateur
				</label>
				<input
					type='text'
					name='name'
					id='register-name'
					className={classnames("", {
						invalid: state.errors.name,
					})}
					required
					value={state.name}
					onChange={handleChange}
					placeholder="Entrez votre nom d'utilisateur"
				/>
				<span className='red-text'>{state.errors.name}</span>

				<label htmlFor='register-email' id='register-email-label'>
					Email
				</label>
				<input
					type='email'
					name='email'
					id='register-email'
					className={classnames("", {
						invalid: state.errors.email,
					})}
					placeholder='Entrez votre email'
					required
					value={state.email}
					onChange={handleChange}
				/>
				<span className='red-text'>{state.errors.email}</span>
				<label htmlFor='register-password' id='register-password-label'>
					Mot de passe
				</label>
				<input
					type='password'
					name='password'
					id='register-password'
					className={classnames("", {
						invalid: state.errors.password,
					})}
					placeholder='Entrez votre mot de passe'
					required
					value={state.password}
					onChange={handleChange}
				/>
				<span className='red-text'>{state.errors.password2}</span>
				<label htmlFor='register-password2' id='register-password2-label'>
					Ressaisissez votre mot de passe
				</label>
				<input
					type='password'
					name='password2'
					id='register-password2'
					className={classnames("", {
						invalid: state.errors.password2,
					})}
					placeholder='Entrez votre mot de passe'
					required
					value={state.password2}
					onChange={handleChange}
				/>
				<span className='red-text'>{state.errors.password2}</span>
				<p id='register-password-information'>
					Votre mot de passe doit contenir au moins 8 caractères.
				</p>
				<button type='submit' id='register-submit' onSubmit={handleSubmit}>
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
// class Presentational extends React.Component<IRegisterProps, IRegisterState> {
// 	constructor(props: IRegisterProps) {
// 		super(props);
// 		this.state = {
// 			name: "",
// 			email: "",
// 			password: "",
// 			password2: "",
// 			errors: {},
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
// 	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
// 		if (e.target.type === "email") {
// 			this.props.writeEmail(e.target.value);
// 		} else if (e.target.type === "password") {
// 			this.props.writePassword(e.target.value);
// 		} else if (e.target.type === "text") {
// 			this.props.writeUsername(e.target.value);
// 		}
// 	}
// 	private handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
// 		e.preventDefault();
// 		const User = {
// 			username: this.props.register.username,
// 			email: this.props.register.email,
// 			password: this.props.register.password,
// 		};
// 		// axios
// 		// .post("/s-enregistrer", User)
// 		// axios({ method: "POST", url: "http://localhost:5000/s-enregistrer", data: User, params:User })
// 		// 	.then((res) => {
// 		// 		return this.props.register(null);
// 		// 	})
// 		// 	.catch((err) => this.props.registerUser(err));
// 		console.log(User);
// 	};
// 	render() {
// 		return (
// 			<main id='register'>
// 				<h1>S'enregistrer</h1>
// 				<h2>Bienvenue sur PrépaStat !</h2>
// 				<form
// 					action='/s-enregistrer'
// 					method='post'
// 					id='register-form'
// 					onSubmit={this.handleSubmit}
// 				>
// 					<label htmlFor='register-username' id='username'>
// 						Nom d'utilisateur
// 					</label>
// 					<input
// 						type='text'
// 						name='username'
// 						id='register-username'
// 						required
// 						value={this.props.register.username}
// 						onChange={this.handleChange}
// 						placeholder="Entrez votre nom d'utilisateur"
// 					/>
// 					<label htmlFor='register-email' id='register-email-label'>
// 						Email
// 					</label>
// 					<input
// 						type='email'
// 						name='email'
// 						id='register-email'
// 						placeholder='Entrez votre email'
// 						required
// 						value={this.props.register.email}
// 						onChange={this.handleChange}
// 					/>
// 					<label htmlFor='register-password' id='register-password-label'>
// 						Mot de passe
// 					</label>
// 					<input
// 						type='password'
// 						name='password'
// 						id='register-password'
// 						placeholder='Entrez votre mot de passe'
// 						required
// 						value={this.props.register.password}
// 						onChange={this.handleChange}
// 					/>
// 					<label htmlFor='register-password2' id='register-password2-label'>
// 						Ressaisissez votre mot de passe
// 					</label>
// 					<input
// 						type='password'
// 						name='password2'
// 						id='register-password2'
// 						placeholder='Entrez votre mot de passe'
// 						required
// 						value={this.props.register.password2}
// 						onChange={this.handleChange}
// 					/>
// 					<p id='register-password-information'>
// 						Votre mot de passe doit contenir au moins 8 caractères.
// 					</p>
// 					<button type='submit' id='register-submit'>
// 						Créer un compte
// 					</button>
// 				</form>
// 				<div id='yes-account'>
// 					<p>Vous avez déjà un compte ?</p>
// 					<Link to='/se-connecter'>Se connecter</Link>
// 				</div>
// 			</main>
// 		);
// 	}
// }

// ? REDUX
const mapStateToProps = (state: RootState): any => {
	return {
		auth: state.auth,
		errors: state.errors,
	};
};
const dispatchToProps = {
	registerUser,
};
export const Register = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
