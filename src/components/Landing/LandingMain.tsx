import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import student from "@illustrations/teacher-student-pana.svg";
import scss from "./landing.module.scss";

const LandingMain = () => {
   return (
      <Fade triggerOnce delay={200}>
         <section className={scss.landingMain}>
            <div className={scss.landingMain_left}>
               <Heading as='h1'>PrépaStat</Heading>
               <Heading as='h2'>
                  Construisons ensemble votre avenir, intégrez l&apos;école
                  d&apos;ingénieur de vos rêves !
               </Heading>
               <div className={scss.bar}></div>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere obcaecati quos iste soluta voluptas dolorum voluptate
                  autem vel nihil ipsa amet, voluptatem nesciunt nisi debitis,
                  doloribus assumenda. Consequatur, harum rerum?
               </p>
               <div className={scss.btnContainer}>
                  <Link href='#overview'>
                     <a className={scss.btn + " " + scss.btn1}>
                        En savoir plus
                     </a>
                  </Link>
                  <Link href='/s-enregistrer'>
                     <a className={scss.btn + " " + scss.btn2}>
                        S&apos;enregistrer
                     </a>
                  </Link>
               </div>
            </div>
            <div className={scss.landingMain_right}>
               <Image src={student} alt='Happy student' />
            </div>
            {/* {JSON.stringify(pattern)} */}
            <div className={scss.pattern}></div>
         </section>
      </Fade>
   );
};
export default LandingMain;

