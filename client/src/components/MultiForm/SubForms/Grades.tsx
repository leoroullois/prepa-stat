import {
	ChangeEventHandler,
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
	const [error, setError] = useState<boolean>(false);
	const isMarksEmpty = (marks: IGrades[]) => {
		return marks.every((elt) => {
			return 0 <= elt.note && elt.note <= 20;
		});
	};
	const parseName = (name: string) => {
		return name
			.toLowerCase()
			.trim()
			.replaceAll(" ", "-")
			.replaceAll("é", "e")
			.replaceAll("è", "e")
			.replaceAll("ç", "c");
	};
	const handleSubmit: MouseEventHandler = (e) => {
		e.preventDefault();

		if (isMarksEmpty(marks)) {
			setError(true);
		} else {
			setError(false);
			modifyIndex(3, { prop: null });
		}
	};
	const handleBack: MouseEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(1, { prop: null });
	};
	const handlePrevent: FormEventHandler = (e) => {
		e.preventDefault();
	};
	const handleChange: ChangeEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
	};
	useEffect(() => {
		fetch(`/api/coefs/${simul.params.concours}/${simul.params.filiere}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// TODO : set marks
			});
	}, [simul.params]);
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
					{marks.map((elt, index) => {
						return (
							<tr key={index}>
								<td>
									<label htmlFor={parseName(elt.epreuve)}>
										{elt.epreuve} :
									</label>
								</td>
								<td>{elt.coef}</td>
								<td>
									<input
										type='number'
										name={parseName(elt.epreuve)}
										id={parseName(elt.epreuve)}
										placeholder='10'
										value={elt.note}
										onChange={handleChange}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{error && <span>Vous devez renseigner toute les notes.</span>}
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
