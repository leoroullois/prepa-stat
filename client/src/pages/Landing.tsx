import React from "react";
import axios, { AxiosResponse } from "axios";
import "../css/landing.css";
import { SchoolCard } from "../components/SchoolCard";
export interface ILandingProps {}
export interface ILandingState {
	msg: string;
}
export class Landing extends React.Component<ILandingProps, ILandingState> {
	constructor(props: ILandingProps) {
		super(props);
		this.state = {
			msg: "",
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e: React.MouseEvent) {
		e.preventDefault();
		console.log(e);
		const ecole = document.querySelector(
			".ecole-polytechnique"
		) as HTMLDivElement;
		ecole.style.display = "flex";
	}
	componentDidMount() {
		axios.get("/api/schools").then((res:AxiosResponse) => {
			const {data} = res;
			this.setState({msg:data[0].ecole})
		});
	}
	render() {
		return (
			<main id='landing'>
				<h1>Accueil</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
					nulla esse quod ipsam, ex eos sapiente voluptate fugit quibusdam
					facilis, nesciunt ad odio? Asperiores pariatur nihil beatae
					accusantium recusandae optio.
				</p>
				<button onClick={this.handleClick}>Fiche école polytechnique</button>
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
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum est
					voluptates, voluptate quibusdam animi fugiat ut asperiores nihil
					itaque quidem fugit reprehenderit, modi facilis error cupiditate iste
					et corporis voluptas?
				</p>
				<p>{this.state.msg}</p>
			</main>
		);
	}
}
