import { FC, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store";
interface IProps {
	provider?: string;
	svg?: string;
	auth: IAuth;
}
interface IAuthProviderBtnProps {
	provider: string;
	svg: string;
}
export const Presentational: FC<IProps> = ({ provider, svg, auth }) => {
	const {SERVER_URL} = auth.urls;
	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log("efef");
		window.location.href = `${SERVER_URL}/auth/${provider?.toLowerCase()}`;
	};
	return (
		<button
			onClick={handleClick}
			className={`connect-with ${provider?.toLowerCase()}`}
		>
			<img src={svg} alt={provider + " logo"} />
			Connexion avec {provider}
		</button>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState): IProps => {
	return {
		auth: state.auth,
	};
};

export const AuthProviderBtn: FC<IAuthProviderBtnProps> =
	connect(mapStateToProps)(Presentational);
