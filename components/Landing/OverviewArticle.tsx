import { FC } from "react";
import { IconType } from "react-icons";
import { Fade } from "react-awesome-reveal";
import scss from "./overviewarticle.module.scss";
import { Heading } from "@chakra-ui/react";
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
				<Heading as="h4">{title}</Heading>
				<p>{text}</p>
			</article>
		</Fade>
	);
};