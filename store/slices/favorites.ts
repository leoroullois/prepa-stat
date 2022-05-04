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
/**
 * Add a school to the favorites of the user
 */
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

/**
 * Get favorites from the database and store them in the store
 */
export const setFavorites = createAsyncThunk(
   "favorites/setFavorites",
   async (userId: string, { rejectWithValue, fulfillWithValue }) => {
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
/**
 * Update the schools in the database
 */
export const updateFavorites = createAsyncThunk(
   "favorites/updateFavorites",
   async (
      data: { favorites: string[]; userId: string },
      { rejectWithValue, fulfillWithValue }
   ) => {
      try {
         const res = await fetch(`/api/favorites/update`, {
            method: "POST",
            body: JSON.stringify({
               favorites: data.favorites,
               userId: data.userId,
            }),
         }).then((res) => res.json());
         if (isEmpty(res.favorites)) {
            rejectWithValue("No favorites found");
         }
         return fulfillWithValue(res);
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
/**
 * Remove all schools from the favorites list
 */
export const resetFavorites = createAsyncThunk(
   "favorites/resetFavorites",
   async (userId: string, { rejectWithValue }) => {
      if (mongoose.Types.ObjectId.isValid(userId)) {
         const res = await fetch(`/api/favorites/reset`, {
            method: "DELETE",
            body: JSON.stringify({
               userId,
            }),
         }).then((res) => res.json());
         return res;
      } else {
         return rejectWithValue("ID is not valid");
      }
   }
);
/**
 * Remove all schools from the favorites list
 */
export const removeFromFavorites = createAsyncThunk(
   "favorites/removeFromFavorites",
   async (
      data: { userId: string; schoolId: string },
      { rejectWithValue, fulfillWithValue }
   ) => {
      const { userId, schoolId } = data;

      if (mongoose.Types.ObjectId.isValid(userId)) {
         const res = await fetch(`/api/favorites/${userId}`, {
            method: "DELETE",
            body: JSON.stringify({
               schoolId,
            }),
         }).then((res) => res.json());
         const output = await Promise.all(
            res.favorites.map(async (id: string) => {
               const school = await fetch(`/api/schools/id/${id}`).then((res) =>
                  res.json()
               );
               return school;
            })
         );
         return fulfillWithValue(output);
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
      builder.addCase(setFavorites.fulfilled, (state, action) => {
         console.log("[FULFILLED]", action.payload);
         const schools = action.payload as ISchool[];
         return schools;
      });

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

      // * UPDATE FAVORITES
      builder.addCase(updateFavorites.pending, () => {
         console.log("[PENDING] updateFavorites");
      });
      builder.addCase(updateFavorites.rejected, (state, action) => {
         const err = action.payload;
         console.log("[REJECTED]", err);
      });
      builder.addCase(
         updateFavorites.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED]", action.payload);
         }
      );
      // * REMOVE FROM FAVORITES
      builder.addCase(removeFromFavorites.pending, () => {
         console.log("[PENDING] removeFromFavorites");
      });
      builder.addCase(removeFromFavorites.rejected, (state, action) => {
         const err = action.payload;
         console.log("[REJECTED]", err);
      });
      builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
         console.log("[FULFILLED] removeFromFavorites", action.payload);
         const res = action.payload as any;
         state = res.favorites;
         return state;
      });
   },
});

export default favorites.reducer;

