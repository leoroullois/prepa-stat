import { FC } from "react";
import { Fade } from "react-awesome-reveal";
import scss from "./overviewarticle.module.scss";
import { Heading, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
interface IProps {
   icon: string;
   text: string;
   title: string;
   delay: number;
}
export const OverviewArticle: FC<IProps> = ({ icon, text, title, delay }) => {
   const { colorMode } = useColorMode();
   return (
      <Fade triggerOnce delay={delay}>
         <article className={scss.overviewArticle} style={{}}>
            <Image
               src={icon}
               className={scss.icon}
               alt={title}
               height='120px'
               width='120px'
            />
            <Heading as='h4'>{title}</Heading>
            <p>{text}</p>
         </article>
      </Fade>
   );
};

