import { FC } from "react";
import { IconType } from "react-icons";
import { Fade } from "react-awesome-reveal";
import "../css/overviewarticle.css";
interface IProps {
	Icon: IconType;
	text: string;
	title: string;
	delay:number;
}
export const OverviewArticle: FC<IProps> = ({ Icon, text, title, delay }) => {
	return (
		<Fade triggerOnce delay={delay}>
			<article className='overview-article'>
				<Icon className='icon' />
				<h4>{title}</h4>
				<p>{text}</p>
			</article>
		</Fade>
	);
};
