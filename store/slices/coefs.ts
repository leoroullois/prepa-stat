import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoef } from "../../backend/models/Coef";

type State = ICoef[];

const init = (): State => {
	return [];
};

const coefs = createSlice({
	name: "coefs",
	initialState: init(),
	reducers: {
		setCoefs: (state, action: PayloadAction<ICoef[]>) => {
			return action.payload;
		},
	},
});
export const { setCoefs } = coefs.actions;

export default coefs.reducer;
