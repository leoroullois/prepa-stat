import { createSlice } from "@reduxjs/toolkit";
interface IState {
	opened: boolean;
}
const init = (): IState => {
	return {
		opened: false,
	};
};
const sideNav = createSlice({
	name: "sideNav",
	initialState: init(),
	reducers: {
		close: (state) => {
			state.opened = false;
		},
		open: (state) => {
			state.opened = true;
		},
	},
});

export const { close, open } = sideNav.actions;
export default sideNav.reducer;
