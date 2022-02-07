import { FC, FormEventHandler } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export const SimulatorGrades: FC<any> = () => {
	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<form
			action=''
			onSubmit={handleSubmit}
			id='grades'
			className='simulator-content active'
		>
			<h2>🧠 Rentrez vos notes</h2>
			<table>
				<thead>
					<tr>
						<th>Epreuve</th>
						<th>Coefficients</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
                <tr>
						<td>
							<label htmlFor='math-a'>Mathématiques A :</label>
						</td>
						<td>5</td>
						<td>
							<input type='number' name='math-a' id='math-a' />
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor='math-a'>Mathématiques B :</label>
						</td>
						<td>5</td>
						<td>
							<input type='number' name='math-a' id='math-a' />
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor='math-a'>Physique A :</label>
						</td>
						<td>5</td>
						<td>
							<input type='number' name='math-a' id='math-a' />
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
