import { IAllFormData, ICardBegin, IGrades } from "@lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const init = (): IAllFormData => {
   return {
      params: {
         concours: "",
         filiere: "",
         cinq_demi: false,
         lv2: false,
      },
      grades: [],
   };
};
const multiForm = createSlice({
   name: "multiForm",
   initialState: init(),
   reducers: {
      setCard(state, action: PayloadAction<ICardBegin>) {
         state.params = action.payload;
      },
      setGrades(state, action: PayloadAction<IGrades[]>) {
         state.grades = action.payload;
      },
   },
});

export const { setCard, setGrades } = multiForm.actions;

export default multiForm.reducer;

