import { FC } from "react";
import {
	IoInformationCircleOutline,
	IoRocketOutline,
	IoTrophyOutline,
} from "react-icons/io5";
import scss from "./indicator.module.scss";

interface IProps {
	formIndex: number;
}
const Indicator: FC<IProps> = ({ formIndex }) => {
	return (
		<div className={scss.containerIndicator}>
			<div className={scss.containerLines}>
				<div
					className={scss.line +" "+scss.upperLine}
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
				<div className={scss.line +" "+scss.underLine}></div>
			</div>
			<div className={scss.containerImg}>
				<div className={scss.blocImg}>
					<IoInformationCircleOutline />
				</div>
				<div className={scss.blocImg}>
					<IoRocketOutline />
				</div>
				<div className={scss.blocImg}>
					<IoTrophyOutline />
				</div>
			</div>
		</div>
	);
};

export default Indicator;
