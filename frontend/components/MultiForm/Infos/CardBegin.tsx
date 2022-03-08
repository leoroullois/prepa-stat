import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
interface IErrors {
	concours: boolean;
	filiere: boolean;
}
const CardBegin: FC<IProps> = ({ modifyIndex }) => {
	/**
	 * * form data state
	 */
	const [formData, setFormData] = useState<ICardBegin>({
		concours: "",
		filiere: "",
		cinq_demi: false,
		lv2: false,
	});
	/**
	 * * error state to handle empty form data
	 */
	const [errors, setErrors] = useState<IErrors>({
		concours: false,
		filiere: false,
	});
	/**
	 * Determine if formData is empty
	 * @param pFormData ICardBegin data
	 * @returns true if an input is empty
	 */
	const isFormDataEmpty = (pFormData: ICardBegin) => {
		return !pFormData.concours || !pFormData.filiere;
	};
	/**
	 * Set errors if formData is empty or dispatch state and go to grades
	 * @param e submit event
	 */
	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		if (isFormDataEmpty(formData)) {
			// ? set errors to display message
			if (formData.filiere === "") {
				setErrors({
					...errors,
					filiere: true,
				});
			}
			if (formData.concours === "") {
				setErrors({
					...errors,
					concours: true,
				});
			}
		} else {
			setErrors({
				concours: false,
				filiere: false,
			});
			modifyIndex(2, { payload: formData, prop: "params" });
		}
	};
	/**
	 * Change the selected radio button to the state
	 * @param e radio change event
	 */
	const handleRadio: ChangeEventHandler = (e) => {
		const elt = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[elt.name]: elt.id,
		});
	};
	/**
	 * Change checked checkboxes to the state
	 * @param e checkbox change event
	 */
	const handleCheckbox: ChangeEventHandler = (e) => {
		const elt = e.target as HTMLInputElement;
		if (elt.id === "cinq_demi") {
			setFormData({
				...formData,
				cinq_demi: !formData.cinq_demi,
			});
		} else if (elt.id === "lv2") {
			setFormData({
				...formData,
				lv2: !formData.lv2,
			});
		}
	};
	return (
		<form
			action=''
			className='simulator-content active'
			id='params'
			onSubmit={handleSubmit}
		>
			<h2>✨ Renseignez vos informations</h2>
			<fieldset>
				<legend>Choisissez votre concours :</legend>
				<div>
					<input
						type='radio'
						name='concours'
						id='x-ens'
						checked={formData.concours === "x-ens"}
						onChange={handleRadio}
					/>
					<label htmlFor='x-ens'>X-ENS</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='mines-pont'
						checked={formData.concours === "mines-pont"}
						onChange={handleRadio}
					/>
					<label htmlFor='mines-pont'>Mines Pont</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='centrale'
						checked={formData.concours === "centrale"}
						onChange={handleRadio}
					/>
					<label htmlFor='centrale'>Centrale</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='ccinp'
						checked={formData.concours === "ccinp"}
						onChange={handleRadio}
					/>
					<label htmlFor='ccinp'>CCINP</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='e3a'
						checked={formData.concours === "e3a"}
						onChange={handleRadio}
					/>
					<label htmlFor='e3a'>E3A</label>
				</div>
				{errors.concours && <span>Vous devez choisir un concours</span>}
			</fieldset>

			<fieldset>
				<legend>Choisissez votre filière :</legend>
				<div>
					<input
						type='radio'
						name='filiere'
						id='mp'
						checked={formData.filiere === "mp"}
						onChange={handleRadio}
					/>
					<label htmlFor='mp'>MP</label>
				</div>
				<div>
					<input
						type='radio'
						name='filiere'
						id='pc'
						checked={formData.filiere === "pc"}
						onChange={handleRadio}
					/>
					<label htmlFor='pc'>PC</label>
				</div>
				<div>
					<input
						type='radio'
						name='filiere'
						id='psi'
						checked={formData.filiere === "psi"}
						onChange={handleRadio}
					/>
					<label htmlFor='psi'>PSI</label>
				</div>
				<div>
					<input
						type='radio'
						name='filiere'
						id='pt'
						checked={formData.filiere === "pt"}
						onChange={handleRadio}
					/>
					<label htmlFor='pt'>PT</label>
				</div>
				{errors.filiere && <span>Vous devez choisir une filière</span>}
			</fieldset>

			<fieldset>
				<legend>Autre :</legend>
				<div>
					<input
						type='checkbox'
						name='options'
						id='cinq_demi'
						checked={formData.cinq_demi}
						onChange={handleCheckbox}
					/>
					<label htmlFor='cinq_demi'>5/2</label>
				</div>
				<div>
					<input
						type='checkbox'
						name='options'
						id='lv2'
						checked={formData.lv2}
						onChange={handleCheckbox}
					/>
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
export default CardBegin;
