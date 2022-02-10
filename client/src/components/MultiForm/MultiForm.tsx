import { FC, useState } from "react";
import { CardBegin } from "./Infos/CardBegin";
import { Grades } from "./SubForms/Grades";
import { CardEnd } from "./Infos/CardEnd";
import { Indicator } from "./Indicator/Indicator";
import { RootState } from "../../store/store";
import { connect, useDispatch } from "react-redux";
import { setMultiFormState } from "../../store/actions/multiFormAction";

const Presentational: FC<any> = () => {
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
		console.log(data);
		const { payload, prop } = data;
		if (payload && prop) {
			setAllFormData({
				...allFormData,
				[prop]: data,
			});
		}
	};
	const modifyIndex = (index: number, formData: ModifyFormDataType) => {
		setFormIndex(index);
		handleFormData(formData);
		dispatch(formData);
	};
	return (
		<section className='container-multiform'>
			{formIndex === 1 ? (
				<CardBegin modifyIndex={modifyIndex} />
			) : formIndex === 2 ? (
				<Grades modifyIndex={modifyIndex} />
			) : (
				<CardEnd modifyIndex={modifyIndex} />
			)}
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
