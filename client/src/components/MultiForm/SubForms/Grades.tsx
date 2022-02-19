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
// * Types declarations
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
interface IRedux {
	simul: IAllFormData;
}
interface IEpreuves {
	nom: string;
	coef: number;
}
type EpreuvesType = IEpreuves[];
interface ICoefs extends Document {
	concours: string;
	filiere: string;
	epreuves: EpreuvesType;
}
// * Component
const Presentational: FC<IProps & IRedux> = ({ modifyIndex, simul }) => {
	const [marks, setMarks] = useState<IGrades[]>([]);
	const [error, setError] = useState<boolean>(false);

	/**
	 * True if all marks are between 0 and 20 and not empty
	 * @param marks array of grades
	 * @returns boolean
	 */
	const marksValidator = (pMarks: IGrades[]) => {
		return pMarks.some((elt) => {
			return elt.note === "" || Number(elt.note) < 0 || 20 < Number(elt.note);
		});
	};
	/**
	 * * Parse the string to be used as jsx attributes.
	 * @param name string
	 * @returns parsed name
	 */
	const parseName = (name: string) => {
		return name
			.toLowerCase()
			.trim()
			.replaceAll(" ", "-")
			.replaceAll("é", "e")
			.replaceAll("è", "e")
			.replaceAll("ç", "c");
	};
	/**
	 * * Submit the form and check for errors
	 * ? @param e mouse event
	 */
	const handleSubmit: MouseEventHandler = (e) => {
		e.preventDefault();
		console.log("Marks when submit : ", marks);
		console.log("Makrs validator : ", marksValidator(marks));
		if (marksValidator(marks)) {
			setError(true);
		} else {
			setError(false);
			modifyIndex(3, { prop: null });
		}
	};
	/**
	 * * return to the 1st page of the simulator
	 * ? @param e mouse event
	 */
	const handleBack: MouseEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(1, { prop: null });
	};
	/**
	 * * prevent from submitting the form
	 * ? @param e form event
	 */
	const handlePrevent: FormEventHandler = (e) => {
		e.preventDefault();
	};
	/**
	 * * Update state when user entering a note
	 * ? @param e input event
	 */
	const handleChange: ChangeEventHandler = (e) => {
		e.preventDefault();
		const elt = e.target as HTMLInputElement;
		if (!isNaN(Number(elt.value))) {
			console.log(elt.value);
			if (0 <= Number(elt.value) && Number(elt.value) <= 20) {
				const parsedMarks = marks.map((elt) => parseName(elt.epreuve));
				const i = parsedMarks.indexOf(elt.id);
				const newMarks = [...marks];
				if (elt.value.length > 1) {
					newMarks[i].note = parseInt(elt.value, 10).toString();
				} else {
					newMarks[i].note = elt.value;
				}
				setMarks(newMarks);
			} else {
				console.log("Veuillez entrer une note entre 0 et 20.");
			}
		} else {
			console.log("Veuillez entrer un chiffre.");
		}
	};
	/**
	 * * Map the API data to grades state format
	 * ? @param data data fetched from the API
	 * ! @returns array of grades
	 */
	const mapAPItoMarks = (data: ICoefs): IGrades[] => {
		const { epreuves } = data;
		console.table(epreuves);
		const output = epreuves.map((elt: IEpreuves) => {
			return {
				epreuve: elt.nom,
				coef: elt.coef,
				note: "",
			};
		});
		return output;
	};
	const createRows = (marks: IGrades[]): JSX.Element[] => {
		return marks.map((elt, index) => {
			return (
				<tr key={index}>
					<td>
						<label htmlFor={parseName(elt.epreuve)}>{elt.epreuve} :</label>
					</td>
					<td>{elt.coef}</td>
					<td>
						<input
							type='text'
							name={parseName(elt.epreuve)}
							id={parseName(elt.epreuve)}
							placeholder='10'
							value={marks[index].note}
							onChange={handleChange}
						/>
					</td>
				</tr>
			);
		});
	};

	useEffect(() => {
		fetch(`/api/coefs/${simul.params.concours}/${simul.params.filiere}`)
			.then((res) => res.json())
			.then((data: ICoefs) => {
				setMarks(mapAPItoMarks(data));
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
				<tbody>{createRows(marks)}</tbody>
			</table>
			{error && (
				<span className='error'>Vous devez renseigner toute les notes.</span>
			)}
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

// * REDUX
const mapStateToProps = (state: RootState) => {
	return {
		simul: state.simul,
		darkMode: state.navBar.darkMode,
	};
};
export const Grades: FC<IProps> = connect(mapStateToProps)(Presentational);
