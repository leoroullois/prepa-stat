import { FC, MouseEventHandler } from "react";
interface IProps {
	provider: string;
	svg: string;
}
export const AuthProviderBtn: FC<IProps> = ({ provider, svg }) => {
	const handleClick: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log("efef");
		window.location.href = `http://localhost:5000/auth/${provider.toLowerCase()}`;
	};
	return (
		<button
			onClick={handleClick}
			className={`connect-with ${provider.toLowerCase()}`}
		>
			<img src={svg} alt={provider + " logo"} />
			Connexion avec {provider}
		</button>
	);
};
