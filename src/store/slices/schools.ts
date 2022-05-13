import { ISchool } from "@models/School";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = ISchool[];
const init = (): State => {
   return [];
};
const school = createSlice({
   name: "school",
   initialState: init(),
   reducers: {
      setSchools(state, action: PayloadAction<ISchool[]>) {
         return action.payload;
      },
   },
});

export const { setSchools } = school.actions;
export default school.reducer;
