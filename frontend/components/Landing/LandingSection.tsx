import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import scss from "./landingsection.module.scss";
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
			<section id={name.toLocaleLowerCase()} className={scss.landingSection}>
				<div className={scss.wrapper}>
					<div className={scss.sectionTitle}>
						<div className={scss.bar}></div>
						<h3>{title}</h3>
					</div>
					<div className={scss.sectionContent}>
						<Image
							className={scss.svg}
							src={img}
							width={450}
							// height={400}
							alt='Leaderboard'
						/>
						<div className={scss.sectionMainContent}>
							<p className={scss.sectionText}>{text}</p>
							<Link href={path}>
								<a className={scss.sectionBtn}>{name}</a>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Fade>
	);
};
