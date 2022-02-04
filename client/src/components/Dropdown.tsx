import React from "react";
/** ReactRouter */
import { Link } from "react-router-dom";
/**Icons */
import { MdScience } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { AiFillCalculator, AiFillApi } from "react-icons/ai";
/**D3 */
import { connect } from "react-redux";
import { RootState } from "../store/store";
interface IState {}
interface IProps {
	onClick: Function;
	disableStat: (pValue: boolean) => void;
}
class Presentational extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillUnmount() {
		this.props.onClick();
	}
	handleClick() {
		this.props.disableStat(false);
	}
	render() {
		return (
			<div className='dropdown-content' onClick={this.handleClick}>
				<ul>
					<li>
						<Link className='dropdown-link' to='/statistiques/mp/generale'>
							<AiFillCalculator />
							MP
						</Link>
					</li>
					<li>
						<Link className='dropdown-link' to='/statistiques/pc/generale'>
							<MdScience />
							PC
						</Link>
					</li>
					<li>
						<Link className='dropdown-link' to='/statistiques/psi/generale'>
							<GiMaterialsScience />
							PSI
						</Link>
					</li>
					<li>
						<Link className='dropdown-link' to='/statistiques/pt/generale'>
							<AiFillApi />
							PT
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		subNav: state.subNav,
		navBar: state.navBar,
	};
};

export const Dropdown = connect(mapStateToProps, null)(Presentational);
