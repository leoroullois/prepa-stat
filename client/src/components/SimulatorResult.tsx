import { FC } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/store";
interface IResultProps {
	simulator: ISimulState;
}
const Presentational: FC<any> = () => {
	return (
		<div className='simulator-content' id='result'>
			<h2>🎊 Résultat</h2>
			Félicitation vous êtes admissible !
		</div>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState): IResultProps => {
	return {
		simulator: state.simulator,
	};
};

export const SimulatorResult: FC<{}> = connect(
	mapStateToProps,
	null
)(Presentational);
