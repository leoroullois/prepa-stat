import { FC } from "react";
import { IconType } from "react-icons";
import "../css/overviewarticle.css"
interface IProps {
	Icon:IconType;
	text:string;
	title:string;
}
export const OverviewArticle: FC<IProps> = ({Icon, text, title}) => {
	return (
		<article className="overview-article">
			<Icon className="icon"/>
			<h4>{title}</h4>
			<p>
				{text}
			</p>
		</article>
	);
};
