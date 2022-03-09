import { FC, useState } from "react";
import CardBegin from "./Infos/CardBegin";
import Grades from "./SubForms/Grades";
import CardEnd from "./Infos/CardEnd";
import Indicator from "./Indicator/Indicator";
import { useDispatch } from "react-redux";
import { setCard, setGrades } from "../../store/slices/multiform";
import scss from "./multiform.module.scss";

const MultiForm: FC = () => {
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
				if (prop === "params") {
					const data = payload as ICardBegin;
					dispatch(setCard(data));
				} else {
					const data = payload as IGrades[];
					dispatch(setGrades(data));
				}
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
		<section
			className={scss.containerMultiForm + " " + scss.simulatorContainer}
		>
			<Indicator formIndex={formIndex} />
			{elements.filter((_elt, i) => i + 1 === formIndex)}
		</section>
	);
};
export default MultiForm;
