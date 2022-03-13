import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import scss from "../scss/login.module.scss";

interface IProps {
	provider: string;
	svg: string;
}
const AuthProviderBtn: FC<IProps> = ({ provider, svg }) => {
	const router = useRouter();

	const handleClick: MouseEventHandler = async (e) => {
		e.preventDefault();
		router.push(`/api/auth/${provider.toLowerCase()}`);
	};
	return (
		<button
			onClick={handleClick}
			className={classnames(scss["provider"], provider.toLowerCase())}
		>
			<Image
				className={scss["provider--img"]}
				src={svg}
				alt={provider + " logo"}
				height={35}
				width={35}
			/>
			<p>Connexion avec {provider}</p>
		</button>
	);
};

export default AuthProviderBtn;
