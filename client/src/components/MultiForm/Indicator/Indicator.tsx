import React from "react";
import {
	IoInformationCircleOutline,
	IoRocketOutline,
	IoTrophyOutline,
} from "react-icons/io5";
export const Indicator = () => {
	return (
		<div className='container-indicator'>
			<div className='container-lines'>
				<div className='line upper-line'></div>
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
