import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
export const CardBegin: FC<IProps> = ({ modifyIndex }) => {
	const [formData, setFormData] = useState<ICardBegin>({
		concours: "",
		filiere: "",
		cinq_demi: false,
		lv2: false,
	});
	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(2, { payload: formData, prop: "params" });
	};
	const handleRadio: ChangeEventHandler = (e) => {
		console.log(e);
		const elt = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[elt.name]: elt.value,
		});
	};
	const handleCheckbox: ChangeEventHandler = (e) => {
		console.log(e);
		const elt = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[elt.id]: elt.value,
		});
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
						onChange={handleRadio}
					/>
					<label htmlFor='x-ens'>X-ENS</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='mines-pont'
						onChange={handleRadio}
					/>
					<label htmlFor='mines-pont'>Mines Pont</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='centrale'
						onChange={handleRadio}
					/>
					<label htmlFor='centrale'>Centrale</label>
				</div>
				<div>
					<input
						type='radio'
						name='concours'
						id='ccinp'
						onChange={handleRadio}
					/>
					<label htmlFor='ccinp'>CCINP</label>
				</div>
				<div>
					<input type='radio' name='concours' id='e3a' onChange={handleRadio} />
					<label htmlFor='e3a'>E3A</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Choisissez votre filière :</legend>
				<div>
					<input type='radio' name='filiere' id='mp' onChange={handleRadio} />
					<label htmlFor='mp'>MP</label>
				</div>
				<div>
					<input type='radio' name='filiere' id='pc' onChange={handleRadio} />
					<label htmlFor='pc'>PC</label>
				</div>
				<div>
					<input type='radio' name='filiere' id='psi' onChange={handleRadio} />
					<label htmlFor='psi'>PSI</label>
				</div>
				<div>
					<input type='radio' name='filiere' id='pt' onChange={handleRadio} />
					<label htmlFor='pt'>PT</label>
				</div>
			</fieldset>

			<fieldset>
				<legend>Autre :</legend>
				<div>
					<input
						type='checkbox'
						name='options'
						id='cinq_demi'
						onChange={handleCheckbox}
					/>
					<label htmlFor='cinq_demi'>5/2</label>
				</div>
				<div>
					<input
						type='checkbox'
						name='options'
						id='lv2'
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
