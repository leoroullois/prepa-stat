import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISchool } from "@models/School";

type State = ISchool[];

const init = (): State => {
	return [];
};

const schools = createSlice({
	name: "schools",
	initialState: init(),
	reducers: {
		setSchools: (state, action: PayloadAction<ISchool[]>) => {
			return action.payload;
		},
	},
});
export const { setSchools } = schools.actions;

export default schools.reducer;
