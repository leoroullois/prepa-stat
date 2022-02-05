import { FC } from "react";
import { Link } from "react-router-dom";
import "../css/landingsection.css";
import { Fade } from "react-awesome-reveal";

interface IProps {
	title: string;
	text: string;
	img: string;
	path: string;
	name: string;
    direction:any;
}
export const LandingSection: FC<IProps> = ({
	title,
	text,
	img,
	path,
	name,
    direction
}) => {
	return (
		<Fade triggerOnce direction={direction}>
			<section id={name.toLocaleLowerCase()} className='landing-section'>
				<div className='wrapper'>
					<div className='section-title'>
						<div className='bar'></div>
						<h3>{title}</h3>
					</div>
					<div className='section-content'>
						<img className='section-img' src={img} alt='Leaderboard' />
						<div className='section-main-content'>
							<p className='section-text'>{text}</p>
							<Link className='section-btn' to={path}>
								{name}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Fade>
	);
};
