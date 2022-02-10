import {
	FC,
	FormEventHandler,
	MouseEventHandler,
	useEffect,
	useState,
} from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
	simul: IAllFormData;
}
const Presentational: FC<IProps> = ({ modifyIndex, simul }) => {
	const [marks, setMarks] = useState<IGrades[]>([]);
	const [rows, setRows] = useState<any>([]);
	const handleSubmit: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		modifyIndex(3, { prop: null });
	};
	const handleBack: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		modifyIndex(1, { prop: null });
	};
	const handlePrevent: FormEventHandler = (e) => {
		e.preventDefault();
	};
	useEffect(() => {});
	return (
		<form onSubmit={handlePrevent} id='grades' className='simulator-content'>
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
							<label htmlFor='math-b'>Maths B :</label>
						</td>
						<td>5</td>
						<td>
							<input
								type='number'
								name='math-b'
								id='math-b'
								placeholder='10'
								value=''
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor='phys-a'>Physique A :</label>
						</td>
						<td>5</td>
						<td>
							<input
								type='number'
								name='phys-a'
								id='phys-a'
								placeholder='10'
								value=''
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<div className='btn-container'>
				<button type='button' onClick={handleBack}>
					<IoArrowBack className='icon' />
					<span>Retour</span>
				</button>
				<button type='button' onClick={handleSubmit}>
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
		simul: state.simul,
	};
};
export const Grades: FC<any> = connect(mapStateToProps)(Presentational);
