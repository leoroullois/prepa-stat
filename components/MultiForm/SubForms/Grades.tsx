import {
	ChangeEventHandler,
	FC,
	FormEventHandler,
	MouseEventHandler,
	useEffect,
	useState,
} from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCoefs, selectSimul } from "../../../store/selectors";

import scss from "./grades.module.scss";
import style from "../multiform.module.scss";
import { IEpreuves, ICoef } from "../../../models/Coef";
// * Types declarations
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
// interface IEpreuves {
// 	nom: string;
// 	coef: number;
// }
// type EpreuvesType = IEpreuves[];
// interface ICoefs extends Document {
// 	concours: string;
// 	filiere: string;
// 	epreuves: EpreuvesType;
// }
// * Component
const Grades: FC<IProps> = ({ modifyIndex }) => {
	// TODO: gérer la LV2
	const [marks, setMarks] = useState<IGrades[]>([]);
	const [error, setError] = useState<boolean>(false);

	const simul = useSelector(selectSimul);
	const coefs = useSelector(selectCoefs);
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
		if (marksValidator(marks)) {
			setError(true);
		} else {
			setError(false);
			modifyIndex(3, { prop: "grades", payload: marks });
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
			if (elt.validity.valid) {
				const parsedMarks = marks.map((elt) => parseName(elt.epreuve));
				const i = parsedMarks.indexOf(elt.id);
				const newMarks = [...marks];
				const splitedNumber = elt.value.split(".");
				let myNumber = parseInt(splitedNumber[0], 10).toString();
				if (splitedNumber[0] === "20") {
					newMarks[i].note = "20";
					setMarks(newMarks);
					console.log("Note maximale: 20.");
				} else if (splitedNumber[1] && splitedNumber[1].length > 2) {
					console.log("Précision maximale : 2 chiffres après la virgule.");
				} else if (elt.value.length === 0) {
					newMarks[i].note = "";
					setMarks(newMarks);
				} else if (elt.value[elt.value.length - 1] === ".") {
					newMarks[i].note = elt.value;
					setMarks(newMarks);
				} else if (
					0 <= parseInt(myNumber, 10) &&
					parseInt(myNumber, 10) <= 20
				) {
					if (splitedNumber.length === 2) {
						myNumber += "." + splitedNumber[1].toString();
					}
					newMarks[i].note = myNumber;
					setMarks(newMarks);
				} else {
					console.log("Veuillez entrer une note entre 0 et 20.");
				}
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
	const mapAPItoMarks = (data: ICoef): IGrades[] => {
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
							pattern='^[0-9]\d*\.?\d*$'
							value={marks[index].note}
							onChange={handleChange}
						/>
					</td>
				</tr>
			);
		});
	};

	useEffect(() => {
		const data = coefs.filter((coef) => {
			return (
				coef.concours === simul.params.concours &&
				coef.filiere === simul.params.filiere
			);
		});
		setMarks(mapAPItoMarks(data[0]));
	}, [simul.params, coefs]);
	return (
		<form
			onSubmit={handlePrevent}
			className={style.simulatorContent + " " + scss.grades}
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
				<tbody>{createRows(marks)}</tbody>
			</table>
			{error && (
				<span className={scss.error}>
					Vous devez renseigner toute les notes.
				</span>
			)}
			<div className={scss.btnContainer}>
				<button type='button' onClick={handleBack}>
					<IoArrowBack className={scss.icon} />
					<span>Retour</span>
				</button>
				<button type='button' onClick={handleSubmit}>
					<span>Résultat</span>
					<IoArrowForward className={scss.icon} />
				</button>
			</div>
		</form>
	);
};

export default Grades;
