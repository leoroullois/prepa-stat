import { Link } from "react-router-dom";
import student from "../assets/student2-removebg-rogned.png";
import { useEffect } from "react";
export const LandingMain = () => {

	return (
		<section className='landing-main' id='home-particles'>
			<div className='landing-main_left'>
				<h1>PrépaStat</h1>
				<h2>
					Construisons ensemble votre avenir, intégrez l'école d'ingénieur de
					vos rêves !
				</h2>
				<div className='bar'></div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					obcaecati quos iste soluta voluptas dolorum voluptate autem vel nihil
					ipsa amet, voluptatem nesciunt nisi debitis, doloribus assumenda.
					Consequatur, harum rerum?
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
	);
};
