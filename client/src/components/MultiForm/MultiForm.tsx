import { FC, useState } from "react";
import { CardBegin } from "./Infos/CardBegin";
import { Grades } from "./SubForms/Grades";
import { CardEnd } from "./Infos/CardEnd";
import { Indicator } from "./Indicator/Indicator";
import { RootState } from "../../store/store";
import { connect, useDispatch } from "react-redux";
import { setMultiFormState } from "../../store/actions/multiFormAction";
import { IAction } from "../../store/actions/multiFormAction";
interface IProps {
	setMultiFormState: (payload: ICardBegin | IGrades) => IAction;
}
const Presentational: FC<IProps> = ({ setMultiFormState }) => {
	const dispatch = useDispatch();
	const [formIndex, setFormIndex] = useState(1);
	const [allFormData, setAllFormData] = useState<IAllFormData>({
		params: {
			concours: "",
			filiere: "",
			cinq_demi: false,
			lv2: false,
		},
		grades: [],
	});
	const handleFormData = (data: ModifyFormDataType) => {
		console.table(data.payload);
		const { payload, prop } = data;
		if (payload && prop) {
			setAllFormData({
				...allFormData,
				[prop]: data,
			});
			if (payload) {
				dispatch(setMultiFormState(payload));
			}
		}
	};
	const modifyIndex = (index: number, formData: ModifyFormDataType) => {
		setFormIndex(index);
		handleFormData(formData);
	};

	const elements = [
		<CardBegin modifyIndex={modifyIndex} key={1} />,
		<Grades modifyIndex={modifyIndex} key={2} />,
		<CardEnd modifyIndex={modifyIndex} key={3} />,
	];
	return (
		<section className='container-multiform simulator-container'>
			<Indicator formIndex={formIndex} />
			{elements.filter((_elt, i) => i + 1 === formIndex)}
		</section>
	);
};

// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		simul: state.simul,
	};
};
const dispatchToProps = {
	setMultiFormState,
};
export const MultiForm: FC<any> = connect(
	mapStateToProps,
	dispatchToProps
)(Presentational);
