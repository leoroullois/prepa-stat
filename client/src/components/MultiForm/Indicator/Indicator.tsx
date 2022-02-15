import { FC } from "react";
import {
	IoInformationCircleOutline,
	IoRocketOutline,
	IoTrophyOutline,
} from "react-icons/io5";
import "../../../css/indicator.css";
interface IProps {
	formIndex: number;
}
export const Indicator: FC<IProps> = ({ formIndex }) => {
	return (
		<div className='container-indicator'>
			<div className='container-lines'>
				<div
					className='line upper-line'
					style={{
						width:
							formIndex === 1
								? "0%"
								: formIndex === 2
								? "50%"
								: formIndex === 3
								? "100%"
								: "",
					}}
				></div>
				<div className='line under-line'></div>
			</div>
			<div className='container-img'>
				<div className='bloc-img'>
					<IoInformationCircleOutline />
				</div>
				<div className='bloc-img'>
					<IoRocketOutline />
				</div>
				<div className='bloc-img'>
					<IoTrophyOutline />
				</div>
			</div>
		</div>
	);
};
