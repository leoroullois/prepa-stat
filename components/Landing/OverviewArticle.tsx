import { FC } from "react";
import { IconType } from "react-icons";
import { Fade } from "react-awesome-reveal";
import scss from "./overviewarticle.module.scss";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
interface IProps {
   icon: string;
   text: string;
   title: string;
   delay: number;
}
export const OverviewArticle: FC<IProps> = ({ icon, text, title, delay }) => {
   return (
      <Fade triggerOnce delay={delay}>
         <article className={scss.overviewArticle}>
            {/* <Icon className={scss.icon} /> */}
            <Image src={icon} className={scss.icon} alt={title} height="120px" width="120px"/>
            <Heading as='h4'>{title}</Heading>
            <p>{text}</p>
         </article>
      </Fade>
   );
};
