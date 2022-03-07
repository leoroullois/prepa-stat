import React, { FC } from "react";
import Link from "next/link";
/**Icons */
import { MdScience } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { AiFillCalculator, AiFillApi } from "react-icons/ai";
/**D3 */
import { connect } from "react-redux";
import { RootState } from "../store/store";
interface IProps {
	disableStat: (pValue: boolean) => void;
}
const Presentational: FC<IProps> = ({ disableStat }) => {
	const handleClick = () => {
		disableStat(false);
	};
	return (
		<div className='dropdown-content' onClick={handleClick}>
			<ul>
				<li>
					<Link href='/statistiques/mp/generale'>
						<a className='dropdown-link'>
							<AiFillCalculator />
							MP
						</a>
					</Link>
				</li>
				<li>
					<Link href='/statistiques/pc/generale'>
						<a className='dropdown-link'>
							<MdScience />
							PC
						</a>
					</Link>
				</li>
				<li>
					<Link href='/statistiques/psi/generale'>
						<a className='dropdown-link'>
							<GiMaterialsScience />
							PSI
						</a>
					</Link>
				</li>
				<li>
					<Link href='/statistiques/pt/generale'>
						<a className='dropdown-link'>
							<AiFillApi />
							PT
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		stats: state.stats,
		navBar: state.navBar,
	};
};

export const Dropdown = connect(mapStateToProps, null)(Presentational);
