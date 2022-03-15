import { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuth } from "../../store/selectors";
import { logout } from "../../store/slices/auth";
import scss from "../Nav/navbar.module.scss";

const AuthBtn: FC = () => {
	const auth = useSelector(selectAuth);
	const dispatch = useDispatch();

	const router = useRouter();
	const darkRed = "rgb(160, 22, 22)";
	const darkBlue = "#255af8";
	const { isAuthenticated } = auth;
	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
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
				backgroundColor: isAuthenticated ? darkRed : darkBlue,
			}}
			onClick={handleClick}
		>
			{isAuthenticated ? "Se déconnecter" : "Se connecter"}
		</button>
	);
};

export default AuthBtn;
