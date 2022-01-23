import { IChoose } from "./action";
import { IState } from "./SubNav";
import { CHOOSE_SUB_SECTION, RESET } from "./type";
const init = ():IState => {
	const url = document.location.href.split("/");
const allLinkStrings: string[] = [
	"generale",
	"x",
	"ens",
	"centrale",
	"mines",
	"ccinp",
	"e3a",
	"letudiant",
	"usine-nouvelle",
	"informations",
	"graphiques",
	"lorem-ipsum"
];
let activeUrl: string = "generale";
if (url) {
	if (!allLinkStrings.includes(url[url.length - 1])) {
		activeUrl = "generale";
	} else {
		activeUrl = url[url.length - 1];
	}
}
return {
	active:activeUrl,
}
}



export const subNavReducer = (
	state: IState = init(),
	action: IChoose
) => {
	switch (action.type) {
		case CHOOSE_SUB_SECTION:
			console.log("action.newSection ", action.newSection);
			console.log("state.active ", state.active);
			if (action.newSection === state.active) {
				return {
					...state,
				};
			} else {
				const newSection = document.getElementsByClassName(
					action.newSection
				)[0];
				let lastSection = document.getElementsByClassName(state.active)[0];
				if (!lastSection) {
					lastSection = document.getElementsByClassName(action.classes[0])[0];
				}
				newSection.classList.add("active");
				lastSection.classList.remove("active");
				return {
					...state,
					active: action.newSection,
				};
			};
		case RESET:
			if(action.page==="classements") {
				return {
					...state,
					active:"letudiant",
				}
			} else {
				return {
					...state,
					active:"generale"
				}
			}
		default:
			return state;
	}
};
