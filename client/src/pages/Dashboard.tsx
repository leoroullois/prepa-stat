import { FC, useState, useEffect, MouseEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import { logoutUser } from "../store/thunks/logout";
import { connect } from "react-redux";
import { RootState } from "../store/store";
import jwt_decode from "jwt-decode";
import "../css/dashboard.css";
import { SchoolCard } from "../components/SchoolCard";
interface IProps {
	auth: IAuth;
	logoutUser: any;
}

export const Presentational: FC<IProps> = ({ auth, logoutUser }) => {
	const [state, setState] = useState({
		name: auth.user.name,
	});
	useEffect(() => {
		document.title = "Dashboard - PrépaStat";
		if (!state.name) {
			const token = localStorage.jwtToken;
			const decoded: any = jwt_decode(token);
			if (decoded) {
				setState({
					...state,
					name: decoded.name,
				});
			}
		}
	}, [state]);
	const [ecole, setEcole] = useState("");
	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		const ecole = document.querySelector(
			".ecole-polytechnique"
		) as HTMLDivElement;
		ecole.style.display = "flex";
	};
	useEffect(() => {
		document.title = "Accueil - PrépaStat";
		axios.get("/api/schools").then((res: AxiosResponse) => {
			const { data } = res;
			setEcole(data[0].ecole);
		});
	});
	return (
		<main id='dashboard'>
			<h1>Bienvenue {state.name}. Vous êtes connectés !</h1>
			<section id='test'>
				<h3>Test</h3>
				<button onClick={handleClick}>Fiche école polytechnique</button>
				<SchoolCard
					data={{
						nom: "Ecole polytechnique",
						classement: 1,
						nb_places: 105,
						rg_median: 81,
						rg_moyen: 82,
						pourcent5_2: 10.5,
						fille: 8.5,
						url: "https://www.google.com",
						annee: 2021,
					}}
					maxPlace={196}
				/>
				<p>{ecole}</p>
			</section>
		</main>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		auth: state.auth,
	};
};
const dispatchToProps = {
	logoutUser,
};
export const Dashboard: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
