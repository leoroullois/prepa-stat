import { FC, FormEventHandler, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
export const Grades: FC<IProps> = ({ modifyIndex }) => {
	const [marks, setMarks] = useState<IGrades[]>([]);
	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		modifyIndex(3, { prop: null });
	};
	const handleReset: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		modifyIndex(1, { prop: null });
	};
	return (
		<form
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
