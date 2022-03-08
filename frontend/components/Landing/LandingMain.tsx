import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import student from "../assets/student2-removebg-rogned.png";
const LandingMain = () => {
	return (
		<Fade triggerOnce delay={200}>
			<section className='landing-main' id='home-particles'>
				<div className='landing-main_left'>
					<h1>PrépaStat</h1>
					<h2>
						Construisons ensemble votre avenir, intégrez l&apos;école
						d&apos;ingénieur de vos rêves !
					</h2>
					<div className='bar'></div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
						obcaecati quos iste soluta voluptas dolorum voluptate autem vel
						nihil ipsa amet, voluptatem nesciunt nisi debitis, doloribus
						assumenda. Consequatur, harum rerum?
					</p>
					<div className='btn-container'>
						<Link href='#overview'>
							<a className='btn btn1'>En savoir plus</a>
						</Link>
						<Link href='/s-enregistrer'>
							<a className='btn btn2'>S&apos;enregistrer</a>
						</Link>
					</div>
				</div>
				<div className='landing-main_right'>
					<Image src={student} alt='Happy student' />
				</div>
			</section>
		</Fade>
	);
};
export default LandingMain;