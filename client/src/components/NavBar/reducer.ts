import { IState } from "./NavBar";
import { toggleType } from "./action";
import {
	TOGGLE_DARK_MODE,
	TOGGLE_DROPDOWN_LEADERBOARD,
	TOGGLE_DROPDOWN_STAT,
} from "./type";
const isDarkMode = ():boolean => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
const init = ():IState => {
	return {
		darkMode: isDarkMode(),
		leaderboard:false,
		stats:false,
	}
}
// const initialState: IState = {
// 	darkMode:
// 		window.matchMedia &&
// 		window.matchMedia("(prefers-color-scheme: dark)").matches,
// 	leaderboard: false,
// 	stats: false,
// };
export const navBarReducer = (
	state: IState = init(),
	action: toggleType
) => {
	switch (action.type) {
		case TOGGLE_DARK_MODE:
			return { ...state, darkMode: !state.darkMode };
		case TOGGLE_DROPDOWN_STAT:
			return {
				...state,
				stats: !state.stats,
				leaderboard: false,
			};
		case TOGGLE_DROPDOWN_LEADERBOARD:
			return {
				...state,
				leaderboard: !state.leaderboard,
				stats: false,
			};
		default:
			return state;
	}
};
