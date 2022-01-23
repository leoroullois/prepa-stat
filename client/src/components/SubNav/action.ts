import { CHOOSE_SUB_SECTION, RESET } from "./type";
export interface IChoose {
	type: string;
	newSection: string;
	classes: string[];
	page: string;
}
export interface IReset {
	type: string;
	page: string;
}
export const chooseAction = (
	pNewSection: string,
	pClasses: string[],
	pPage: string
): IChoose => {
	if (pPage !== "") {
		return {
			type: RESET,
			newSection: pNewSection,
			classes: pClasses,
			page: pPage,
		};
	} else {
        return {
            type: CHOOSE_SUB_SECTION,
            newSection: pNewSection,
            classes: pClasses,
            page: pPage,
        };
    }
};
