import mongoose from "mongoose";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISchool } from "@models/School";
import isEmpty from "is-empty";

type State = ISchool[];

interface IIds {
   userId: string;
   schoolId: string;
}
const init = (): State => {
   return [];
};
export const addToFavorites = createAsyncThunk(
   "favorites/addToFavorites",
   async ({ userId, schoolId }: IIds, { rejectWithValue }) => {
      const res = await fetch(`/api/favorites/${userId}`, {
         method: "POST",
         body: JSON.stringify({
            schoolId,
         }),
      }).then((res) => res.json());
      if (isEmpty(res.favorites)) {
         rejectWithValue("No favorites found");
      } else {
         const output = await Promise.all(
            res.favorites.map(async (id: string) => {
               const school = await fetch(`/api/schools/id/${id}`).then((res) =>
                  res.json()
               );
               return school;
            })
         );
         return output;
      }
   }
);

export const setFavorites = createAsyncThunk(
   "favorites/setFavorites",
   async (userId: string, { rejectWithValue }) => {
      const res = await fetch(`/api/favorites/${userId}`).then((res) =>
         res.json()
      );
      if (isEmpty(res.favorites)) {
         rejectWithValue("No favorites found");
      } else {
         const output = await Promise.all(
            res.favorites.map(async (id: string) => {
               const school = await fetch(`/api/schools/id/${id}`).then((res) =>
                  res.json()
               );
               return school;
            })
         );
         return output;
      }
   }
);

export const resetFavorites = createAsyncThunk(
   "favorites/resetFavorites",
   async (userId: string, { rejectWithValue }) => {
      if (mongoose.Types.ObjectId.isValid(userId)) {
         const res = await fetch(`/api/favorites/${userId}/reset`, {
            method: "DELETE",
         }).then((res) => res.json());
         return res;
      } else {
         return rejectWithValue("ID is not valid");
      }
   }
);
const favorites = createSlice({
   name: "favorites",
   initialState: init(),
   reducers: {},
   extraReducers: (builder) => {
      // * Add to favorites
      builder.addCase(addToFavorites.pending, (state, action) => {
         console.log("[PENDING] ", action.payload);
      });
      builder.addCase(addToFavorites.rejected, (state, action) => {
         const err = action.payload;
         console.log("[REJECTED]", err);
      });
      builder.addCase(
         addToFavorites.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED]", action.payload);
            const schools = action.payload as ISchool[];
            return schools;
         }
      );
      // * SET FAVORITES
      builder.addCase(setFavorites.pending, (state, action) => {
         console.log("[PENDING] ", action.payload);
      });
      builder.addCase(setFavorites.rejected, (state, action) => {
         const err = action.payload;
         console.log("[REJECTED]", err);
      });
      builder.addCase(
         setFavorites.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED]", action.payload);
            const schools = action.payload as ISchool[];
            return schools;
         }
      );

      // * RESET FAVORITES
      builder.addCase(resetFavorites.pending, (state, action) => {
         console.log("[PENDING] ", action.payload);
      });
      builder.addCase(resetFavorites.rejected, (state, action) => {
         const err = action.payload;
         console.log("[REJECTED]", err);
      });
      builder.addCase(
         resetFavorites.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED]", action.payload);
            return [];
         }
      );
   },
});

export default favorites.reducer;

