import { FC } from "react";
/**scss */
import scss from "../scss/sidenav.module.scss";
/**Redux */
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { closeAction } from "../store/actions/sideNavAction";
/**react-icons */
import { IoClose } from "react-icons/io5";
import { AiFillApi, AiFillCalculator, AiFillHome } from "react-icons/ai";
import { MdLeaderboard, MdScience } from "react-icons/md";
/**react-router */
import { VscRunAll } from "react-icons/vsc";
import { GiMaterialsScience } from "react-icons/gi";
import { AuthBtn } from "./AuthBtn";

import Link from "next/link";
interface IProps {
	close: () => void;
	style: { marginLeft: string };
	layout: any;
}
const Presentational: FC<IProps> = ({ close, layout, style }) => {
	const dispatch = useDispatch();
	const closeNav = () => {
		dispatch(close());
	};
	return (
		<nav className={scss.sideNav} style={style}>
			<h2>
				<div className='close-icon' onClick={closeNav}>
					<IoClose id='close-icon' />
				</div>
				PrépaStat
			</h2>
			<div className='bar'></div>
			<Link href='/'>
				<a className='responsive-link' onClick={closeNav}>
					<AiFillHome className='responsive-icon' />
					Accueil
				</a>
			</Link>
			<div className='bar'></div>
			<Link href='/classements/l-etudiant'>
				<a className='responsive-link' onClick={closeNav}>
					<MdLeaderboard className='responsive-icon' />
					Classements
				</a>
			</Link>
			<div className='bar'></div>
			<Link href='/simulateur'>
				<a className='responsive-link' onClick={closeNav}>
					<VscRunAll className='responsive-icon' />
					<p>Simulateur</p>
				</a>
			</Link>
			<div className='bar'></div>
			<div className='responsive-link-stats-container'>
				<h3>Statistiques</h3>
				<Link href='/statistiques/mp/generale'>
					<a className='responsive-link-stats' onClick={closeNav}>
						<AiFillCalculator className='responsive-icon' />
						MP
					</a>
				</Link>
				<Link href='/statistiques/pc/generale'>
					<a className='responsive-link-stats' onClick={closeNav}>
						<MdScience className='responsive-icon' />
						PC
					</a>
				</Link>
				<Link href='/statistiques/psi/generale'>
					<a className='responsive-link-stats' onClick={closeNav}>
						<GiMaterialsScience className='responsive-icon' />
						PSI
					</a>
				</Link>
				<Link href='/statistiques/pt/generale'>
					<a className='responsive-link-stats' onClick={closeNav}>
						<AiFillApi className='responsive-icon' />
						PT
					</a>
				</Link>
			</div>
			{layout.width <= 768 && <div className='bar'></div>}
			{layout.width <= 768 && <AuthBtn />}
			{layout.width <= 768 && <div className='bar'></div>}
		</nav>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		layout: state.layout,
	};
};
const dispatchToProps = {
	close: () => (dispatch: AppDispatch) => dispatch(closeAction()),
};
export const SideNav: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
