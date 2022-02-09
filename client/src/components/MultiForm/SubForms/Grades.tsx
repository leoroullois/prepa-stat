import { FC, FormEventHandler, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { connect } from "react-redux";
import { setGrades, goBack } from "../../../store/actions/simulatorAction";
import { RootState } from "../../../store/store";
interface IGradesProps {
	simulator: ISimulState;
	setGrades: any;
	goBack: any;
}
const Presentational: FC<IGradesProps> = ({ simulator, setGrades, goBack }) => {
	const [marks, setMarks] = useState<IGrades[]>([]);
	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		const params = document.querySelector("#params") as HTMLElement;
		const grades = document.querySelector("#grades") as HTMLElement;
		const result = document.querySelector("#result") as HTMLElement;
		result.classList.add("active");
		grades.classList.add("filled");
		result.classList.remove("zero");
		result.classList.remove("back");
		setTimeout(() => {
			grades.classList.remove("active");
			grades.classList.add("zero");
		}, 200);
	};
	const handleReset: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		const params = document.querySelector("#params") as HTMLElement;
		const grades = document.querySelector("#grades") as HTMLElement;
		const result = document.querySelector("#result") as HTMLElement;
		params.classList.remove("filled");
		params.classList.remove("active");
		params.classList.add("active");
		grades.classList.add("back");
		setTimeout(() => {
			grades.classList.remove("active");
			grades.classList.add("zero");
		}, 200);
	};
	return (
		<form
			action=''
			onSubmit={handleSubmit}
			onReset={handleReset}
			id='grades'
			className='simulator-content'
		>
			<h2>🧠 Rentrez vos notes</h2>
			<table>
				<thead>
					<tr>
						<th>Epreuve</th>
						<th>Coef.</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<label htmlFor='math-a'>Maths A :</label>
						</td>
						<td>5</td>
						<td>
							<input
								type='number'
								name='math-a'
								id='math-a'
								placeholder='10'
								value=''
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor='math-a'>Maths B :</label>
						</td>
						<td>5</td>
						<td>
							<input
								type='number'
								name='math-a'
								id='math-a'
								placeholder='10'
								value=''
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor='math-a'>Physique A :</label>
						</td>
						<td>5</td>
						<td>
							<input
								type='number'
								name='math-a'
								id='math-a'
								placeholder='10'
								value=''
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<div className='btn-container'>
				<button type='reset'>
					<IoArrowBack className='icon' />
					<span>Retour</span>
				</button>
				<button type='submit'>
					<span>Résultat</span>
					<IoArrowForward className='icon' />
				</button>
			</div>
		</form>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		simulator: state.simulator,
	};
};
const dispatchToProps = {
	setGrades,
	goBack,
};

export const Grades: FC<{}> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
