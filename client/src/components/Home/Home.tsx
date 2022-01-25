import React from "react";
import "./home.css";
import { SchoolCard } from "../SchoolCard/SchoolCard";
export interface IHomeProps {}
export interface IHomeState {
	msg: string;
}
export class Home extends React.Component<IHomeProps, IHomeState> {
	constructor(props: IHomeProps) {
		super(props);
		this.state = {
			msg: "",
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleAPI=this.handleAPI.bind(this);
	}
	handleClick(e: React.MouseEvent) {
		e.preventDefault();
		console.log(e);
		const ecole = document.querySelector(
			".ecole-polytechnique"
		) as HTMLDivElement;
		ecole.style.display = "flex";
	}
	async handleAPI() {
		const data = await fetch("/api/hello");
		const json = await data.json();
		this.setState({msg:json.text})
	}
	render() {
		return (
			<div id='home'>
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
				<button onClick={this.handleAPI}>
					Appel API test
				</button>
				<p>{this.state.msg}</p>
			</div>
		);
	}
}
