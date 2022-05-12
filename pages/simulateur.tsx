import { GetStaticProps } from "next";
import { FC, MouseEventHandler, useEffect } from "react";
import MultiForm from "../components/MultiForm/MultiForm";
/**CSS */
import scss from "../scss/simulator.module.scss";
import { ICoef } from "../backend/models/Coef";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setCoefs } from "../store/slices/coefs";
import { close } from "@store/slices/sideNav";

interface IProps {
   coefs: ICoef[];
}
const Simulator: FC<IProps> = ({ coefs }) => {
   const dispatch = useDispatch();
   dispatch(setCoefs(coefs));
   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };
   return (
      <>
         <Head>
            <title>Simulateur d&apos;admissibilité - PrépaStat</title>
         </Head>
         <section onClick={handleCloseNav} className={scss.simulator}>
            <h1>Simulateur d&apos;admissibilité</h1>
            <MultiForm />
         </section>
      </>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const res = await fetch(process.env.HOST + "/api/coefs");
   const coefs = await res.json();
   return {
      props: {
         coefs,
      },
   };
};

export default Simulator;
