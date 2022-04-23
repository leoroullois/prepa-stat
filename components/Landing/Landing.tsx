import { FC, MouseEventHandler } from "react";
import { Fade } from "react-awesome-reveal";
/**Icons */
import { FcOpenedFolder, FcGraduationCap, FcManager } from "react-icons/fc";
/**Components */
import { OverviewArticle } from "./OverviewArticle";
import { LandingSection } from "./LandingSection";
import LandingMain from "./LandingMain";
/**Images */
import leaderboard from "../../public/leaderboard.svg";
import stats from "../../public/stats.svg";
import simulator from "../../public/simulator.svg";
import documents from "@icons/documents.svg";
import student from "@icons/student.svg";
import teamCollaboration from "@icons/team-collaboration.svg";

/**CSS */
import scss from "./landing.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectNavBar } from "../../store/selectors";
import { Heading } from "@chakra-ui/react";
import { close } from "@store/slices/sideNav";

const lightStyles = {
   backgroundColor: "#FFF",
   borderBottom: "2px solid rgba(0,0,0,0.192)",
};
const Landing: FC = () => {
   const dispatch = useDispatch();

   const navBar = useSelector(selectNavBar);
   const lorem =
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint voluptate suscipit in, possimus dicta nemo quisquam cumque. Culpaminus, cum sequi vero quisquam, assumenda accusantium recusandae expedita fuga itaque porro!";
   const bgRect = (
      <svg width='404' height='784' fill='none' viewBox='0 0 404 784'>
         <defs>
            <pattern
               id='56409614-3d62-4985-9a10-7ca758a8f4f0'
               x='0'
               y='0'
               width='20'
               height='20'
               patternUnits='userSpaceOnUse'
            >
               <rect
                  x='0'
                  y='0'
                  width='4'
                  height='4'
                  fill='currentColor'
               ></rect>
            </pattern>
         </defs>
         <rect
            width='404'
            height='784'
            fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)'
         ></rect>
      </svg>
   );
   const handleClick: MouseEventHandler = (e) => {
      dispatch(close());
   };
   return (
      <main className={scss.landing} onClick={handleClick}>
         <LandingMain />
         <div className={scss.barSection}></div>
         <section
            className={scss.overview}
            style={navBar.darkMode ? {} : lightStyles}
         >
            <Fade triggerOnce delay={200}>
               <div className={scss.wrapper}>
                  <Heading as='h3' className={scss["our-goals"]}>
                     <div className={scss.bar}></div>
                     <span>Nos objectifs</span>
                  </Heading>
                  <div className={scss.articleContainer}>
                     <OverviewArticle
                        title="Facilité l'accès à l'information"
                        text={lorem}
                        icon={documents}
                        delay={300}
                     />
                     <OverviewArticle
                        title='Accompagner les étudiants'
                        text={lorem}
                        icon={student}
                        delay={400}
                     />
                     <OverviewArticle
                        title='Motiver les étudiants'
                        text={lorem}
                        icon={teamCollaboration}
                        delay={500}
                     />
                  </div>
               </div>
            </Fade>
         </section>
         <div className={scss.landingSections}>
            <LandingSection
               title="Comparez les écoles d'ingénieurs"
               img={leaderboard}
               text={lorem}
               path='/classements'
               name='Classements'
               direction='left'
            />
            <LandingSection
               title='Simulez votre admissibilité'
               img={simulator}
               text={lorem}
               path='/simulateur'
               name='Simulateur'
               direction='right'
            />
            <LandingSection
               title="Trouvez l'école qui vous correspond"
               img={stats}
               text={lorem}
               path='/statistiques/mp/generale'
               name='Statistiques'
               direction='left'
            />
            <div className={scss.bgRect + " " + scss.bgRect1}>{bgRect}</div>
            <div id='bg-rect-2' className={scss.bgRect + " " + scss.bgRect2}>
               {bgRect}
            </div>
         </div>
      </main>
   );
};

export default Landing;
