import { FC } from "react";
import {
	IoInformationCircleOutline,
	IoRocketOutline,
	IoTrophyOutline,
} from "react-icons/io5";
import scss from "../../../scss/indicator.module.scss";

interface IProps {
	formIndex: number;
}
const Indicator: FC<IProps> = ({ formIndex }) => {
	return (
		<div className={scss.containerIndicator}>
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

export default Indicator;
