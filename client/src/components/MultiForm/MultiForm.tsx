import { useState } from "react";
import { CardBegin } from "./Infos/CardBegin";
import { Grades } from "./SubForms/Grades";
import { CardEnd } from "./Infos/CardEnd";
import { Indicator } from "./Indicator/Indicator";
interface IAllFormData {
	params: ICardBegin;
	grades: IGrades[];
}
export const MultiForm = () => {
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
	};
	return (
		<section className='container-multiform'>
			{formIndex === 1 ? (
				<CardBegin modifyIndex={modifyIndex} />
			) : formIndex === 2 ? (
				<Grades modifyIndex={modifyIndex} />
			) : (
				<CardEnd />
			)}
		</section>
	);
};
