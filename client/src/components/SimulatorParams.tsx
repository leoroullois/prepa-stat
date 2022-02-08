import {
	ChangeEventHandler,
	FC,
	FormEventHandler,
	useEffect,
	useState,
} from "react";
import { IoArrowForward } from "react-icons/io5";
import { connect } from "react-redux";
import { setParams } from "../store/actions/simulatorAction";
import { RootState } from "../store/store";
interface IGradesProps {
	simulator: ISimulState;
}
const Presentational: FC<IGradesProps> = () => {
	const [simulInfo, setSimulInfo] = useState<ISimulInfo>({
		concours: "",
		filiere: "",
		autre: {
			cinq_demi: false,
			lv2: false,
		},
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		console.log(e);
		const params = document.querySelector("#params") as HTMLElement;
		const grades = document.querySelector("#grades") as HTMLElement;
		const result = document.querySelector("#result") as HTMLElement;
		grades.classList.add("active");
		params.classList.add("filled");
		grades.classList.remove("zero");
		grades.classList.remove("back");
		setTimeout(() => {
			params.classList.remove("active");
			params.classList.add("zero");
		}, 200);
	};
	const handleChange: ChangeEventHandler = (e) => {
		const elt: HTMLInputElement = e.target as HTMLInputElement;
		if (elt.name === "concours") {
			console.log(e.target.id);
		} else if (elt.name === "filieres") {
			console.log(e);
		}
	};

	return (
		<form
			action=''
			onSubmit={handleSubmit}
			className='simulator-content active'
			id='params'
		>
			<h2>✨ Renseignez vos informations</h2>
			<fieldset>
				<legend>Choisissez votre concours :</legend>
				<div>
					<input type='radio' name='concours' id='x-ens' />
					<label htmlFor='x-ens'>X-ENS</label>
				</div>
				<div>
					<input type='radio' name='concours' id='mines-pont' />
					<label htmlFor='mines-pont'>Mines Pont</label>
				</div>
				<div>
					<input type='radio' name='concours' id='centrale' />
					<label htmlFor='centrale'>Centrale</label>
				</div>
				<div>
					<input type='radio' name='concours' id='ccinp' />
					<label htmlFor='ccinp'>CCINP</label>
				</div>
				<div>
					<input type='radio' name='concours' id='e3a' />
					<label htmlFor='e3a'>E3A</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Choisissez votre filière :</legend>
				<div>
					<input type='radio' name='filieres' id='mp' />
					<label htmlFor='mp'>MP</label>
				</div>
				<div>
					<input type='radio' name='filieres' id='pc' />
					<label htmlFor='pc'>PC</label>
				</div>
				<div>
					<input type='radio' name='filieres' id='psi' />
					<label htmlFor='psi'>PSI</label>
				</div>
				<div>
					<input type='radio' name='filieres' id='pt' />
					<label htmlFor='pt'>PT</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Autre :</legend>
				<div>
					<input type='checkbox' name='options' id='cinq_demi' />
					<label htmlFor='cinq_demi'>5/2</label>
				</div>
				<div>
					<input type='checkbox' name='options' id='lv2' />
					<label htmlFor='lv2'>LV2</label>
				</div>
			</fieldset>
			<div className='btn-container'>
				<button type='submit'>
					<span>Saisir les notes</span>
					<IoArrowForward className='icon' />
				</button>
			</div>
		</form>
	);
};
// ? REDUX
const mapStateToProps = (state: RootState): IGradesProps => {
	return {
		simulator: state.simulator,
	};
};
const dispatchToProps = {
	setParams,
};

export const SimulatorParams: FC<{}> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
