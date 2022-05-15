import { IFavorite } from "@models/Favorite";
import { ISchool } from "@models/School";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = ISchool[];

interface IIds {
   userId: string;
   schoolId: string;
}

const init = (): State => {
   return [];
};
export const addOneSchoolToFavorites = createAsyncThunk<ISchool[], IIds>(
   "favorites/addOneSchoolToFavorites",
   async ({ userId, schoolId }, thunkApi) => {
      try {
         const res = await fetch(`/api/favorites/${userId}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
            body: JSON.stringify({
               schoolId,
            }),
         }).then((res) => res.json());
         const output = await Promise.all(
            res.favorites.map(async (id: string) => {
               const school = await fetch(`/api/schools/${id}`, {
                  headers: {
                     Authorization: localStorage.getItem("jwtToken") as string,
                  },
               }).then((res) => res.json());
               return school;
            })
         );
         return output as ISchool[];
      } catch (err) {
         return thunkApi.rejectWithValue(err);
      }
   }
);

/**
 * Get favorites from the database and store them in the store
 */
export const setFavorites = createAsyncThunk<ISchool[], string>(
   "favorites/setFavorites",
   async (userId: string, { rejectWithValue }) => {
      try {
         const bearer = localStorage.getItem("jwtToken") as string;
         const res = await fetch(`/api/favorites/${userId}`, {
            headers: {
               Authorization: bearer,
            },
         }).then((res) => res.json());
         const output = await Promise.all(
            res.favorites.map(async (id: string) => {
               const school = await fetch(`/api/schools/${id}`).then((res) =>
                  res.json()
               );
               return school;
            })
         );
         return output as ISchool[];
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
/**
 * Update the schools in the database
 */
export const updateFavorites = createAsyncThunk<
   ISchool[],
   { favorites: string[]; userId: string }
>("favorites/updateFavorites", async (data, { rejectWithValue }) => {
   try {
      const res = await fetch(`/api/favorites/update`, {
         method: "POST",
         body: JSON.stringify({
            favorites: data.favorites,
            userId: data.userId,
         }),
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") as string,
         },
      }).then((res) => res.json());
      const output = await Promise.all(
         res.favorites.map(async (id: string) => {
            const school = await fetch(`/api/schools/${id}`).then((res) =>
               res.json()
            );
            return school;
         })
      );
      return output as ISchool[];
   } catch (err) {
      return rejectWithValue(err);
   }
});
/**
 * Remove all schools from the favorites list
 */
export const resetFavorites = createAsyncThunk<IFavorite, string>(
   "favorites/resetFavorites",
   async (userId, { rejectWithValue }) => {
      console.log("userId", userId);
      try {
         const res = await fetch(`/api/favorites/reset`, {
            method: "DELETE",
            body: JSON.stringify({
               userId,
            }),
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((res) => res.json());

         return res as IFavorite;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
/**
 * Remove all schools from the favorites list
 */
export const removeFromFavorites = createAsyncThunk<
   ISchool[],
   { userId: string; schoolId: string }
>("favorites/removeFromFavorites", async (data, { rejectWithValue }) => {
   const { userId, schoolId } = data;
   try {
      const res = await fetch(`/api/favorites/${userId}`, {
         method: "DELETE",
         body: JSON.stringify({
            schoolId,
         }),
      }).then((res) => res.json());
      const output = await Promise.all(
         res.favorites.map(async (id: string) => {
            const school = await fetch(`/api/schools/${id}`).then((res) =>
               res.json()
            );
            return school;
         })
      );
      return output as ISchool[];
   } catch (err) {
      return rejectWithValue(err);
   }
});

const favorites = createSlice({
   name: "favorites",
   initialState: init(),
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         addOneSchoolToFavorites.fulfilled,
         (state: State, action: PayloadAction<ISchool[]>) => {
            const schools = action.payload;
            return schools;
         }
      );

      builder.addCase(
         setFavorites.fulfilled,
         (state, action: PayloadAction<ISchool[]>) => {
            const schools = action.payload;
            return schools;
         }
      );

      builder.addCase(
         updateFavorites.fulfilled,
         (state, action: PayloadAction<ISchool[]>) => {
            return action.payload;
         }
      );

      builder.addCase(
         removeFromFavorites.fulfilled,
         (state, action: PayloadAction<ISchool[]>) => {
            return action.payload;
         }
      );
   },
});

export default favorites.reducer;

