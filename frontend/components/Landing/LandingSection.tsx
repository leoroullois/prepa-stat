import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import "../css/landingsection.css";
import { Fade } from "react-awesome-reveal";

interface IProps {
	title: string;
	text: string;
	img: string;
	path: string;
	name: string;
	direction: any;
}
export const LandingSection: FC<IProps> = ({
	title,
	text,
	img,
	path,
	name,
	direction,
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
						<Image className='section-img svg' src={img} alt='Leaderboard' />
						<div className='section-main-content'>
							<p className='section-text'>{text}</p>
							<Link href={path}>
								<a className='section-btn'>{name}</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Fade>
	);
};
