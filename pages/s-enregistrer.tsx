import { FormEventHandler, useState, useEffect, FC, ChangeEvent } from "react";
import Link from "next/link";
/**CSS */
import scss from "../scss/register.module.scss";
/**Redux */
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/auth";
import { selectAuth } from "../store/selectors";
import { useRouter } from "next/router";
import Head from "next/head";

interface IProps {
	auth: IAuth;
	// errors: IErrors;
	registerUser: any;
}
const Register: FC<IProps> = () => {
	const auth = useSelector(selectAuth);
	const router = useRouter();

	const dispatch = useDispatch();

	const [state, setState] = useState<IRegisterForm>({
		name: "",
		email: "",
		password1: "",
		password2: "",
	});

	useEffect(() => {
		if (auth.isAuthenticated) {
			router.push("/");
		}
	}, [auth.isAuthenticated, router]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
	};
	const handleClick = () => {
		console.log("USER :", state);
		dispatch(register(state));
		

	};
	return (
		<>
			<Head>
				<title>S&apos;enregistrer - PrépaStat</title>
			</Head>
			<main className={scss["register"]}>
				<h1>S&apos;enregistrer</h1>
				<h2>Bienvenue sur PrépaStat !</h2>
				<form
					action='/s-enregistrer'
					method='post'
					// id='register-form'
					className={scss["register-form"]}
					onSubmit={handleSubmit}
				>
					<label htmlFor='register-name' className={scss["name"]}>
						Nom d&apos;utilisateur
					</label>
					<input
						type='text'
						name='name'
						id='register-name'
						// className={classnames("", {
						// 	invalid: errors.name,
						// })}
						required
						value={state.name}
						onChange={handleChange}
						placeholder="Entrez votre nom d'utilisateur"
					/>
					{/* <span className='red-text'>{errors.name}</span> */}

					<label
						htmlFor='register-email'
						className={scss["register-email-label"]}
					>
						Email
					</label>
					<input
						type='email'
						name='email'
						id='register-email'
						// className={classnames("", {
						// invalid: errors.email,
						// })}
						placeholder='Entrez votre email'
						required
						value={state.email}
						onChange={handleChange}
					/>
					{/* <span className='red-text'>{errors.email}</span> */}
					<label
						htmlFor='register-password'
						className={scss["register-password-label"]}
					>
						Mot de passe
					</label>
					<input
						type='password'
						name='password1'
						id='register-password'
						// className={classnames("", {
						// invalid: errors.password,
						// })}
						placeholder='Entrez votre mot de passe'
						required
						value={state.password1}
						onChange={handleChange}
					/>
					{/* <span className='red-text'>{errors.password2}</span> */}
					<label
						htmlFor='register-password2'
						className={scss["register-password2-label"]}
					>
						Ressaisissez votre mot de passe
					</label>
					<input
						type='password'
						name='password2'
						id='register-password2'
						// className={classnames("", {
						// 	invalid: errors.password2,
						// })}
						placeholder='Entrez votre mot de passe'
						required
						value={state.password2}
						onChange={handleChange}
					/>
					{/* <span className='red-text'>{errors.password2}</span> */}
					<p id='register-password-information'>
						Votre mot de passe doit contenir au moins 8 caractères.
					</p>
					<button
						type='submit'
						className={scss["register-submit"]}
						onClick={handleClick}
					>
						Créer un compte
					</button>
				</form>
				<div className={scss["yes-account"]}>
					<p>Vous avez déjà un compte ?</p>
					<Link href='/se-connecter'>
						<a>Se connecter</a>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Register;
