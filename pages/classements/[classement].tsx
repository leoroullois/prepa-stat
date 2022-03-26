import { GetStaticPaths, GetStaticProps, NextComponentType } from "next";
import { FC, MouseEventHandler } from "react";
// CSS
import scss from "@scss/leaderboard.module.scss";
import { close } from "@store/slices/sideNav";
import { useDispatch } from "react-redux";

export interface IProps {
   params: {
      classement: string;
   };
}
export interface IState {}

const Classement: FC<IProps> = ({ params }) => {
   const dispatch = useDispatch();
   const { classement } = params;
   const match = (concours: string): string => {
      if (concours === "l-etudiant") {
         return "L'étudiant";
      } else {
         return "Usine nouvelle";
      }
   };
   const handleCloseNav: MouseEventHandler = (e) => {
      dispatch(close());
   };
   return (
      <main onClick={handleCloseNav} className={scss.leaderboard}>
         <h1>Classement {match(classement)}.</h1>
      </main>
   );
};

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
         {
            params: { classement: "l-etudiant" },
         },
         {
            params: { classement: "usine-nouvelle" },
         },
      ],
      fallback: false,
   };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
   console.log(params);
   return {
      props: { params },
   };
};

export default Classement;
