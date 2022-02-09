import { useState } from "react";
import { Params } from "./SubForms/Params";
import { Grades } from "./SubForms/Grades";
import { Result } from "./SubForms/Result";
export const MultiForm = () => {
	return (
		<div>
			<section className='simulator-container'>
				<Params />
				<Grades />
				<Result />
			</section>
		</div>
	);
};
