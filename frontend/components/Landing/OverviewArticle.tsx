import { FC } from "react";
import { IconType } from "react-icons";
import { Fade } from "react-awesome-reveal";
import scss from "./overviewarticle.module.scss";
interface IProps {
	Icon: IconType;
	text: string;
	title: string;
	delay: number;
}
export const OverviewArticle: FC<IProps> = ({ Icon, text, title, delay }) => {
	return (
		<Fade triggerOnce delay={delay}>
			<article className={scss.overviewArticle}>
				<Icon className={scss.icon} />
				<h4>{title}</h4>
				<p>{text}</p>
			</article>
		</Fade>
	);
};
