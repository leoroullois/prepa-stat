import { FC, MouseEventHandler } from "react";
interface IProps {
	modifyIndex: (index: number, formData: ModifyFormDataType) => void;
}
export const CardEnd: FC<IProps> = ({ modifyIndex }) => {
	const handleReset: MouseEventHandler = (e) => {
		e.preventDefault();
		modifyIndex(1, { prop: null });
	};
	return (
		<div className='simulator-content' id='result'>
			<h2>🎊 Résultat</h2>
			Félicitation vous êtes admissible !
			<button onClick={handleReset}>Recommencer</button>
		</div>
	);
};
