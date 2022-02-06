import { FC } from "react";
/**CSS */
import "../css/sidenav.css";
/**Redux */
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { closeAction } from "../store/actions/sideNavAction";
/**react-icons */
import { IoClose } from "react-icons/io5";
import { AiFillApi, AiFillCalculator, AiFillHome } from "react-icons/ai";
import { MdLeaderboard, MdScience } from "react-icons/md";
/**react-router */
import { Link } from "react-router-dom";
import { VscRunAll } from "react-icons/vsc";
import { GiMaterialsScience } from "react-icons/gi";
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
		<nav id='side-nav' style={style}>
			<h2>
				<div className='close-icon' onClick={closeNav}>
					<IoClose id='close-icon' />
				</div>
				PrépaStat
			</h2>
			<div className='bar'></div>
			<Link className='responsive-link' to='/' onClick={closeNav}>
				<AiFillHome className='responsive-icon' />
				Accueil
			</Link>
			<div className='bar'></div>
			<Link
				className='responsive-link'
				to='/classements/l-etudiant'
				onClick={closeNav}
			>
				<MdLeaderboard className='responsive-icon' />
				Classements
			</Link>
			<div className='bar'></div>
			<Link className='responsive-link' to='/simulateur' onClick={closeNav}>
				<VscRunAll className='responsive-icon' />
				<p>Simulateur</p>
			</Link>
			<div className='bar'></div>
			<div className='responsive-link-stats-container'>
				<h3>Statistiques</h3>
				<Link
					className='responsive-link-stats'
					to='/statistiques/mp/generale'
					onClick={closeNav}
				>
					<AiFillCalculator className='responsive-icon' />
					MP
				</Link>
				<Link
					className='responsive-link-stats'
					to='/statistiques/pc/generale'
					onClick={closeNav}
				>
					<MdScience className='responsive-icon' />
					PC
				</Link>
				<Link
					className='responsive-link-stats'
					to='/statistiques/psi/generale'
					onClick={closeNav}
				>
					<GiMaterialsScience className='responsive-icon' />
					PSI
				</Link>
				<Link
					className='responsive-link-stats'
					to='/statistiques/pt/generale'
					onClick={closeNav}
				>
					<AiFillApi className='responsive-icon' />
					PT
				</Link>
			</div>
			{layout.width <= 530 && <div className='bar'></div>}
			{layout.width <= 530 && (
				<Link
					className='responsive-link log-in-link'
					to='/se-connecter'
					onClick={closeNav}
				>
					Se connecter
				</Link>
			)}
			{layout.width <= 530 && <div className='bar'></div>}
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
