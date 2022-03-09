import { createSlice } from "@reduxjs/toolkit";

interface IState {
	darkMode: boolean;
	leaderboard: boolean;
	stats: boolean;
}

const isDarkMode = (): boolean => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
const init = (): IState => {
	return {
		darkMode: true,
		leaderboard: false,
		stats: false,
	};
};

const navBar = createSlice({
	name: "navBar",
	initialState: init(),
	reducers: {
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		toggleDropdownLeaderboard: (state) => {
			state.leaderboard = !state.leaderboard;
			state.stats = false;
		},
		toggleDropdownStats: (state) => {
			state.stats = !state.stats;
			state.leaderboard = false;
		},
	},
});
export const {
	toggleDarkMode,
	toggleDropdownLeaderboard,
	toggleDropdownStats,
} = navBar.actions;

export default navBar.reducer;