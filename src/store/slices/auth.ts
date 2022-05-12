import { IAuth, ILoginState, IRegisterForm } from "@lib/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEmpty from "is-empty";
import Router from "next/router";

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

export const login = createAsyncThunk(
   "auth/login",
   async (userData: ILoginState, { rejectWithValue, fulfillWithValue }) => {
      try {
         const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
         }).then((res) => res.json());
         console.log("RES ", res);
         const { message, token, _doc: user } = res;
         if (!isEmpty(res._doc)) {
            return fulfillWithValue({ message, token, user });
         } else {
            return rejectWithValue({ message: "User is empty.", error: res });
         }
      } catch (err) {
         console.log(err);
         return rejectWithValue({
            message: "Something went wrong",
            error: err,
         });
      }
   }
);
export const register = createAsyncThunk(
   "auth/register",
   async (userData: IRegisterForm, { rejectWithValue }) => {
      try {
         const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         console.log("(auth.ts, redux) RES ", res);
         if (!isEmpty(res._doc)) {
            return res;
         } else {
            return rejectWithValue({
               message: "User is empty",
               error: res.error,
            });
         }
      } catch (err) {
         console.log("ERROR ", err);
         return rejectWithValue({
            message: "An error has occured when trying to register",
            error: err,
         });
      }
   }
);
export const setCurrentUserById = createAsyncThunk(
   "auth/setCurrentUserById",
   async (userId: string, { rejectWithValue, fulfillWithValue }) => {
      console.log("userId : ", userId);
      try {
         const user = await fetch(`/api/user/${userId}`).then((res) =>
            res.json()
         );
         if (!isEmpty(user)) {
            return fulfillWithValue({ message: "User found", user });
         } else {
            return rejectWithValue({
               message: "User is empty",
               error: user.error,
            });
         }
      } catch (err) {
         console.log("ERROR ", err);
         return rejectWithValue({
            message: "An error has occured when trying to register",
            error: err,
         });
      }
   }
);
export const changePassword = createAsyncThunk(
   "auth/changePassword",
   async (data: IChangePassword, { rejectWithValue, fulfillWithValue }) => {
      const { userId, ...passwords } = data;

      try {
         const body = { pass: passwords };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         if (!isEmpty(res.user)) {
            return fulfillWithValue({ res });
         } else {
            return rejectWithValue({
               message: res.message,
            });
         }
      } catch (err) {
         return rejectWithValue({
            message: "Error changing password",
         });
      }
   }
);

export const changeName = createAsyncThunk(
   "auth/changeName",
   async (data: IChangeName, { rejectWithValue, fulfillWithValue }) => {
      const { userId, name } = data;

      try {
         const body = { name };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         if (!isEmpty(res.user)) {
            return fulfillWithValue({ res });
         } else {
            return rejectWithValue({
               message: res.message,
            });
         }
      } catch (err) {
         return rejectWithValue({
            message: "Error changing name",
         });
      }
   }
);

export const changeFiliere = createAsyncThunk(
   "auth/changeFiliere",
   async (data: IChangeFiliere, { rejectWithValue, fulfillWithValue }) => {
      const { userId, filiere } = data;

      try {
         const body = { filiere };
         const res = await fetch(`/api/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         if (!isEmpty(res.user)) {
            return fulfillWithValue({ res });
         } else {
            return rejectWithValue({
               message: res.message,
            });
         }
      } catch (err) {
         return rejectWithValue({
            message: "Error changing filiere",
         });
      }
   }
);

export const deleteAccount = createAsyncThunk(
   "auth/deleteAccount",
   async (userId: string, { rejectWithValue, fulfillWithValue }) => {
      try {
         const deletedUser = await fetch(`/api/user/${userId}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
         }).then((res) => res.json());
         const deletedFavorites = await fetch(`/api/favorites/${userId}`, {
            method: "DELETE",
         }).then((res) => res.json());

         if (!isEmpty(deletedUser)) {
            return fulfillWithValue({
               message: "User is deleted.",
               user: deletedUser,
            });
         } else {
            return rejectWithValue({
               message: "User is empty",
            });
         }
      } catch (err) {
         return rejectWithValue({
            message: "Error deleting account",
            error: err,
         });
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
      // ? LOGIN
      builder.addCase(login.pending, (state) => {
         console.log("Loading...");
      });
      builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
         const { token } = action.payload;
         const { name, email, _id, filiere } = action.payload.user;
         const user = {
            _id,
            name,
            email,
            filiere,
         };
         state.errors = [];
         state.user = user;
         state.isAuthenticated = true;
         // ? Save to localStorage (token = 'Bearer ouefoefheoifhofio')
         localStorage.setItem("jwtToken", token);

         Router.push("/dashboard");
      });

      builder.addCase(login.rejected, (state, action) => {
         const err = action.payload as any;
         console.log("[REJECTED] login", err);
         const isArray = Array.isArray(err.error);
         if (isArray) {
            state.errors = err.error;
         } else {
            state.errors = [err.error];
         }
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
         console.log("[REJECTED] register", err);
      });

      // ? Change password
      builder.addCase(changePassword.pending, (state) => {
         console.log("[PENDING] Changing password...");
      });
      builder.addCase(
         changePassword.fulfilled,
         (state, action: PayloadAction<any>) => {
            console.log("[FULFILLED] Password is updated.", action);
         }
      );
      builder.addCase(changePassword.rejected, (state, action) => {
         const err = action.payload as string;
         console.log("[REJECTED] changePassword", err);
      });

      // ? Change name
      builder.addCase(changeName.pending, (state) => {
         console.log("[PENDING] Changing your user name...");
      });
      builder.addCase(
         changeName.fulfilled,
         (state, action: PayloadAction<any>) => {
            const { res } = action.payload;
            state.user = {
               ...state.user,
               name: res.user.name,
            };
            console.log(
               "[FULFILLED] Your user name is updated.",
               action.payload
            );
            return state;
         }
      );
      builder.addCase(changeName.rejected, (state, action) => {
         const err = action.payload as string;
         console.log("[REJECTED] changeName", err);
      });

      // ? Change name
      builder.addCase(changeFiliere.pending, (state) => {
         console.log("[PENDING] Changing your filiere...");
      });
      builder.addCase(
         changeFiliere.fulfilled,
         (state, action: PayloadAction<any>) => {
            const { res } = action.payload;
            state.user = {
               ...state.user,
               filiere: res.user.filiere,
            };
            console.log(
               "[FULFILLED] Your filiere is updated.",
               action.payload.res.user
            );
            return state;
         }
      );
      builder.addCase(changeFiliere.rejected, (state, action) => {
         const err = action.payload as string;
         console.log("[REJECTED] changeFiliere", err);
      });

      // ? Delete account
      builder.addCase(deleteAccount.pending, (state) => {
         console.log("[PENDING] Deleting user...");
      });
      builder.addCase(
         deleteAccount.fulfilled,
         (state, action: PayloadAction<any>) => {
            const { res } = action.payload;
            console.log(
               "[FULFILLED] Your filiere is updated.",
               action.payload.res.user
            );
            return state;
         }
      );
      builder.addCase(deleteAccount.rejected, (state, action) => {
         const err = action.payload as string;
         console.log("[REJECTED] ", err);
      });

      // ? Change current user by id
      builder.addCase(setCurrentUserById.pending, (state) => {
         console.log("[PENDING] setCurrentUserById...");
      });
      builder.addCase(
         setCurrentUserById.fulfilled,
         (state, action: PayloadAction<any>) => {
            const { _id, name, email, filiere } = action.payload.user;
            state.user = {
               _id,
               name,
               email,
               filiere,
            };
            state.isAuthenticated = true;
            console.log("[FULFILLED] setCurrentUserById.", action.payload);
            return state;
         }
      );
      builder.addCase(setCurrentUserById.rejected, (state, action) => {
         const err = action.payload as string;
         console.log("[REJECTED] setCurrentUserById ", err);
      });
   },
});

export const { logout, setCurrentUser } = auth.actions;
export default auth.reducer;

