import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import scss from "./landingsection.module.scss";
import { Fade } from "react-awesome-reveal";
import { Heading } from "@chakra-ui/react";

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
      <Fade triggerOnce direction={direction} className={scss.alternate}>
         <section id={name.toLocaleLowerCase()} className={scss.landingSection}>
            <div className={scss.wrapper}>
               <div className={scss.sectionTitle}>
                  <div className={scss.bar}></div>
                  <Heading as='h3' size='md'>
                     {title}
                  </Heading>
               </div>
               <div className={scss.sectionContent}>
                  <div className={scss["svg-container"]}>
                     <Image className={scss.svg} src={img} alt='Leaderboard' />
                  </div>
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

