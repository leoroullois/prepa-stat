import { authorization } from "./../../../middlewares/authorization.middleware";
import Router from "next/router";

import {
   ILoginUserResponse,
   IRegisterUserResponse,
} from "@controllers/auth.controller";
import { IAuth, ILoginState, IRegisterForm } from "@lib/type";
import { IUser } from "@models/User";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IChangePassword {
   userId: string;
   currPassword: string;
   newPassword: string;
   confirmPassword: string;
}
export interface IChangeName {
   userId: string;
   name: string;
}
export interface IChangeFiliere {
   userId: string;
   filiere: string;
}

const init = (): IAuth => {
   return {
      isAuthenticated: false,
      user: {
         _id: "",
         name: "",
         email: "",
         filiere: "",
      },
      errors: [],
      loading: false,
   };
};

export const login = createAsyncThunk<ILoginUserResponse, ILoginState>(
   "auth/login",
   async (userData, { rejectWithValue }) => {
      try {
         const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
         }).then((res) => res.json());
         const { message, token, user } = res;
         return { message, token, user } as ILoginUserResponse;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const register = createAsyncThunk<IRegisterUserResponse, IRegisterForm>(
   "auth/register",
   async (userData, { rejectWithValue }) => {
      try {
         const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         return res as IRegisterUserResponse;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const setCurrentUserById = createAsyncThunk<IUser, string>(
   "auth/setCurrentUserById",
   async (userId: string, { rejectWithValue }) => {
      try {
         const user = await fetch(`/api/user/${userId}`, {
            method: "GET",
            headers: {
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((res) => res.json());
         return user as IUser;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);

export const changePassword = createAsyncThunk<IUser, IChangePassword>(
   "auth/changePassword",
   async (data, { rejectWithValue }) => {
      const { userId, ...passwords } = data;

      try {
         const body = { pass: passwords };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((data) => data.json());
         return res as IUser;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);

export const changeName = createAsyncThunk<IUser, IChangeName>(
   "auth/changeName",
   async (data, { rejectWithValue }) => {
      const { userId, name } = data;

      try {
         const body = { name };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((data) => data.json());
         return res as IUser;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);

export const changeFiliere = createAsyncThunk<IUser, IChangeFiliere>(
   "auth/changeFiliere",
   async (data, { rejectWithValue }) => {
      const { userId, filiere } = data;

      try {
         const body = { filiere };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((data) => data.json());
         return res as IUser;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);

export const deleteAccount = createAsyncThunk<IUser, string>(
   "auth/deleteAccount",
   async (userId, { rejectWithValue }) => {
      try {
         const deletedUser = await fetch(`/api/user/${userId}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("jwtToken") as string,
            },
         }).then((res) => res.json());
         return deletedUser as IUser;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
const auth = createSlice({
   name: "auth",
   initialState: init(),
   reducers: {
      logout: (state) => {
         localStorage.removeItem("jwtToken");
         return init();
      },
      setCurrentUser: (
         state,
         action: PayloadAction<{
            email: string;
            id: string;
            name: string;
            filiere: string;
         }>
      ) => {
         const { email, id, name, filiere } = action.payload;
         state.user = {
            email,
            name,
            filiere,
            _id: id,
         };
         state.isAuthenticated = true;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(
         login.fulfilled,
         (state, action: PayloadAction<ILoginUserResponse>) => {
            const { token, user } = action.payload;
            state = {
               ...state,
               errors: [],
               user,
               isAuthenticated: true,
               loading: false,
            };
            localStorage.setItem("jwtToken", token);
            Router.push("/dashboard");

            return state;
         }
      );

      builder.addCase(login.rejected, (state, action) => {
         const err = action.payload as any;
         const isArray = Array.isArray(err.error);
         if (isArray) {
            state.errors = err.error;
         } else {
            state.errors = [err.error];
         }
         state.loading = false;
      });

      // ? REGISTER
      builder.addCase(register.pending, (state) => {
         console.log("[PENDING] User loading...");
      });
      builder.addCase(
         register.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED] Successfully registered in.", action);
            state.errors = [];
         }
      );
      builder.addCase(register.rejected, (state, action) => {
         interface IPayload {
            message: string;
            error: any;
         }
         const err = action.payload as any;
         const isArray = Array.isArray(err.error);
         if (isArray) {
            state.errors = err.error;
         } else {
            state.errors = [err.error];
         }
      });

      builder.addCase(
         changeName.fulfilled,
         (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            return state;
         }
      );

      builder.addCase(
         changeFiliere.fulfilled,
         (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            return state;
         }
      );

      builder.addCase(deleteAccount.fulfilled, (state) => {
         return init();
      });

      builder.addCase(
         setCurrentUserById.fulfilled,
         (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            return state;
         }
      );
   },
});

export const { logout, setCurrentUser } = auth.actions;
export default auth.reducer;

