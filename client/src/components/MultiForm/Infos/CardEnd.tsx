import { FC, MouseEventHandler } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
interface IRedux {
	
}
const Presentational: FC<IProps & IRedux> = ({ modifyIndex }) => {
	const handleReset: MouseEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(1, { prop: null });
	};
	return (
		<div className='simulator-content' id='result'>
			<h2>🎊 Résultat</h2>
			<p>Félicitation vous êtes admissible !</p>
			<button onClick={handleReset}>Recommencer</button>
		</div>
	);
};

// * REDUX
const mapStateToProps = (state: RootState) => {
	return {
		simul: state.simul,
		darkMode: state.navBar.darkMode,
	};
};
export const CardEnd: FC<IProps> = connect(mapStateToProps)(Presentational);
