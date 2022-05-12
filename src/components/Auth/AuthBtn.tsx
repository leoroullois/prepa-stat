import { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuth } from "@store/selectors";
import { logout } from "@store/slices/auth";
import scss from "@components/Nav/navbar.module.scss";
import { close } from "@store/slices/sideNav";

const AuthBtn: FC = () => {
   const auth = useSelector(selectAuth);
   const dispatch = useDispatch();

   const router = useRouter();
   const darkRed = "rgb(160, 22, 22)";
   const darkOrange = "#d66214";
   const { isAuthenticated } = auth;
   const handleClick: MouseEventHandler = (e) => {
      e.preventDefault();
      dispatch(close());
      if (isAuthenticated) {
         console.log("Déconnexion");
         dispatch(logout());
      } else {
         router.push("/se-connecter");
      }
   };
   return (
      <button
         className={scss.btnLink + " " + scss.link}
         id='side-nav-auth-btn'
         style={{
            backgroundColor: isAuthenticated ? darkRed : darkOrange,
         }}
         onClick={handleClick}
      >
         {isAuthenticated ? "Se déconnecter" : "Se connecter"}
      </button>
   );
};

export default AuthBtn;
