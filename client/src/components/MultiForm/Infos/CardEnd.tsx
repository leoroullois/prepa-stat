import { FC, MouseEventHandler, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
interface IRedux {
	simul: IAllFormData;
}
const Presentational: FC<IProps & IRedux> = ({ modifyIndex, simul }) => {
	// TODO: comparer la note totale à la barre d'admissibilité
	// TODO: afficher la barre d'admissibilité et le nombre total de points
	
	const { params, grades } = simul;
	const handleReset: MouseEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(1, { prop: null });
	};
	const calcAverage = (pGrades: IGrades[]) => {
		const sum = pGrades.reduce((acc, pGrade) => {
			return acc + pGrade.coef * Number(pGrade.note);
		}, 0);
		const sumCoefs = pGrades.reduce((acc, pGrade) => {
			return acc + pGrade.coef;
		}, 0);
		return sum / sumCoefs;
	};
	useEffect(() => {
		console.log(simul);
	});
	const precise = (x: number): string => {
		if (x >= 10) {
			return x.toPrecision(4);
		} else {
			return x.toPrecision(3);
		}
	};
	const avg = calcAverage(grades);
	if (avg >= 10) {
		return (
			<div className='simulator-content' id='result'>
				<h2>🎊 Résultat</h2>
				<h3>Votre moyenne est de {avg}</h3>
				<p>Félicitation vous êtes admissible !</p>
				<button onClick={handleReset}>Recommencer</button>
			</div>
		);
	} else {
		return (
			<div className='simulator-content' id='result'>
				<h2>😭 Résultat</h2>
				<h3>Votre moyenne est de {precise(avg)}</h3>
				<p>Dommage, vous n'êtes pas admissible !</p>
				<button onClick={handleReset}>Recommencer</button>
			</div>
		);
	}
};

// * REDUX
const mapStateToProps = (state: RootState) => {
	return {
		simul: state.simul,
	};
};
export const CardEnd: FC<IProps> = connect(mapStateToProps)(Presentational);
