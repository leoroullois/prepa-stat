import { FC } from "react";
import { Link } from "react-router-dom";
/**Icons */
import { FcOpenedFolder, FcGraduationCap, FcManager } from "react-icons/fc";
/**Components */
import { OverviewArticle } from "../components/OverviewArticle";
import { LandingSection } from "../components/LandingSection";
/**Images */
import student from "../assets/student2-removebg-rogned.png";
import leaderboard from "../assets/leaderboard.svg";
import stats from "../assets/stats.svg";
import simulator from "../assets/simulator.svg";
/**CSS */
import "../css/landing.css";
import { RootState } from "../store/store";
import { connect } from "react-redux";
const lightStyles = {
	backgroundColor: "#FFF",
	borderBottom: "2px solid rgba(0,0,0,0.192)",
};
interface IProps {
	navBar: any;
}
export const Presentational: FC<IProps> = ({ navBar }) => {
	// TODO : ombre sur les svg & background avec petits points comme sur mon protfolio
	const lorem =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint voluptate suscipit in, possimus dicta nemo quisquam cumque. Culpaminus, cum sequi vero quisquam, assumenda accusantium recusandae expedita fuga itaque porro!";
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
			<section id='overview' style={navBar.darkMode ? {} : lightStyles}>
				<div className='wrapper'>
					<h3>
						<div className='bar'></div>
						<span>Nos objectifs</span>
					</h3>
					<div className='article-container'>
						<OverviewArticle
							title="Facilité l'accès à l'information"
							text={lorem}
							Icon={FcOpenedFolder}
						/>
						<OverviewArticle
							title='Accompagner les étudiants'
							text={lorem}
							Icon={FcManager}
						/>
						<OverviewArticle
							title='Motiver les étudiants'
							text={lorem}
							Icon={FcGraduationCap}
						/>
					</div>
				</div>
			</section>
			<LandingSection
				title="Comparez les écoles d'ingénieurs"
				img={leaderboard}
				text={lorem}
				path='/classements'
				name='Classements'
			/>
			<LandingSection
				title='Simulez votre admissibilité'
				img={simulator}
				text={lorem}
				path='/simulateur'
				name='Simulateur'
			/>
			<LandingSection
				title="Trouvez l'école qui vous correspond"
				img={stats}
				text={lorem}
				path='/statistiques'
				name='Statistiques'
			/>
		</main>
	);
};
const mapStateToProps = (state: RootState) => {
	return {
		navBar: state.navBar,
	};
};

export const Landing: FC<{}> = connect(mapStateToProps)(Presentational);
