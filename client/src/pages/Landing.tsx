import { FC, MouseEventHandler, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import "../css/landing.css";
import { SchoolCard } from "../components/SchoolCard";
import student from "../assets/student2-removebg-rogned.png";
import { FcOpenedFolder, FcGraduationCap, FcManager } from "react-icons/fc";
import { OverviewArticle } from "../components/OverviewArticle";

import leaderboard from "../assets/leaderboard.svg";
import stats from "../assets/stats.svg";
import simulator from "../assets/stats.svg";

export const Landing: FC<{}> = () => {
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
		<main id='landing'>
			<section className='landing-main'>
				<div className='landing-main_left'>
					<h1>PrépaStat</h1>
					<h2>
						Construisons ensemble votre avenir, intégrez l'école d'ingénieur de
						vos rêves !
					</h2>
					<div className='bar'></div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
						obcaecati quos iste soluta voluptas dolorum voluptate autem vel
						nihil ipsa amet, voluptatem nesciunt nisi debitis, doloribus
						assumenda. Consequatur, harum rerum?
					</p>
					<div className='btn-container'>
						<Link to='#overview' className='btn btn1'>
							En savoir plus
						</Link>
						<Link to='/s-enregistrer' className='btn btn2'>
							S'enregistrer
						</Link>
					</div>
				</div>
				<div className='landing-main_right'>
					<img src={student} alt='Happy student' />
				</div>
			</section>
			<div className='bar-section'></div>
			<section id='overview'>
				<div className='wrapper'>
					<h3>
						<div className='bar'></div>
						<span>Nos objectifs</span>
					</h3>
					<div className='article-container'>
						<OverviewArticle
							title="Facilité l'accès à l'information"
							text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit
				optio iusto molestias aspernatur mollitia sint commodi corporis modi
				voluptatum laboriosam recusandae ratione quis minus obcaecati expedita,
				libero unde nemo.'
							Icon={FcOpenedFolder}
						/>
						<OverviewArticle
							title='Accompagner les étudiants'
							text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit
				optio iusto molestias aspernatur mollitia sint commodi corporis modi
				voluptatum laboriosam recusandae ratione quis minus obcaecati expedita,
				libero unde nemo.'
							Icon={FcManager}
						/>
						<OverviewArticle
							title='Motiver les étudiants'
							text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit
				optio iusto molestias aspernatur mollitia sint commodi corporis modi
				voluptatum laboriosam recusandae ratione quis minus obcaecati expedita,
				libero unde nemo.'
							Icon={FcGraduationCap}
						/>
					</div>
				</div>
			</section>
			<section id='classements'>
				<div className='wrapper'>
					<h3>Comparez les écoles d'ingénieurs</h3>
					<div className='classements-content'>
						<img src={leaderboard} alt='Leaderboard' />
						<div className='classements-main-content'>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
								voluptate suscipit in, possimus dicta nemo quisquam cumque.
								Culpa minus, cum, sequi vero quisquam, assumenda accusantium
								recusandae expedita fuga itaque porro!
							</p>
							<Link to='/classement'>Classements</Link>
						</div>
					</div>
				</div>
			</section>
			<section id='simulateur'>
				<h3>Simulateur</h3>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aspernatur
				obcaecati repellendus itaque debitis? Corrupti inventore et provident
				nihil! Explicabo a laboriosam odio culpa magni molestiae, exercitationem
				cumque corporis ab.
			</section>
			<section id='statistics'>
				<h3>Statistiques</h3>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
				excepturi, vitae adipisci tempore dolore sed. Inventore ducimus quod
				accusantium, quaerat, ea suscipit illo molestias est dolor adipisci,
				itaque vel qui?
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
