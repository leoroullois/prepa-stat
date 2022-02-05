import { FC } from "react";

/**Icons */
import { FcOpenedFolder, FcGraduationCap, FcManager } from "react-icons/fc";
/**Components */
import { OverviewArticle } from "../components/OverviewArticle";
import { LandingSection } from "../components/LandingSection";
import { LandingMain } from "../components/LandingMain";
/**Images */
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
	// TODO : ombre sur les svg & background avec petits points comme sur mon
	const lorem =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint voluptate suscipit in, possimus dicta nemo quisquam cumque. Culpaminus, cum sequi vero quisquam, assumenda accusantium recusandae expedita fuga itaque porro!";
	const bgRect = (
		<svg width='404' height='784' fill='none' viewBox='0 0 404 784'>
			<defs>
				<pattern
					id='56409614-3d62-4985-9a10-7ca758a8f4f0'
					x='0'
					y='0'
					width='20'
					height='20'
					patternUnits='userSpaceOnUse'
				>
					<rect x='0' y='0' width='4' height='4' fill='currentColor'></rect>
				</pattern>
			</defs>
			<rect
				width='404'
				height='784'
				fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)'
			></rect>
		</svg>
	);
	return (
		<main id='landing'>
			<LandingMain />
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
			<div className='landing-sections'>
				<LandingSection
					title="Comparez les écoles d'ingénieurs"
					img={leaderboard}
					text={lorem}
					path='/classements'
					name='Classements'
					direction='left'
				/>
				<LandingSection
					title='Simulez votre admissibilité'
					img={simulator}
					text={lorem}
					path='/simulateur'
					name='Simulateur'
					direction='right'
				/>
				<LandingSection
					title="Trouvez l'école qui vous correspond"
					img={stats}
					text={lorem}
					path='/statistiques'
					name='Statistiques'
					direction='left'
				/>
				<div id='bg-rect-1' className='bg-rect'>
					{bgRect}
				</div>
				<div id='bg-rect-2' className='bg-rect'>
					{bgRect}
				</div>
			</div>
		</main>
	);
};
const mapStateToProps = (state: RootState) => {
	return {
		navBar: state.navBar,
	};
};

export const Landing: FC<{}> = connect(mapStateToProps)(Presentational);
