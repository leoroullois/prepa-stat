import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEmpty from "is-empty";
import Router from "next/router";
// import { removeJwtToken, setJwtToken } from "../../lib/auth";
interface IChangePassword {
   userId: string;
   currPassword: string;
   newPassword: string;
   confirmPassword: string;
   onClose: () => void;
}
const init = (): IAuth => {
   return {
      isAuthenticated: false,
      user: {},
      errors: [],
      loading: false,
   };
};

export const login = createAsyncThunk(
   "auth/login",
   async (userData: ILoginState, { rejectWithValue }) => {
      try {
         const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
         }).then((data) => data.json());
         console.log("RES ", res)
         if (!isEmpty(res._doc)) {
            return res;
         } else {
            return rejectWithValue({message: "User is empty.", error: res});
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

export const changePassword = createAsyncThunk(
   "auth/changePassword",
   async (data: IChangePassword, { rejectWithValue, fulfillWithValue }) => {
      const { userId, onClose, ...passwords } = data;

      try {
         const res = await fetch(`/api/auth/user/${userId}/changePassword`, {
            method: "UPDATE",
            body: JSON.stringify(passwords),
            headers: {
               "Content-Type": "application/json",
            },
         }).then((data) => data.json());
         if (!isEmpty(res._doc)) {
            onClose();
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
         action: PayloadAction<{ email: string; id: string; name: string }>
      ) => {
         const { email, id, name } = action.payload;
         state.user = {
            email,
            name,
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
         const { name, email, _id } = action.payload._doc;
         const user = {
            _id,
            name,
            email,
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
         console.log("[REJECTED] ", err);
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
         console.log("[REJECTED] ", err);
      });
      // ?
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
         console.log("[REJECTED] ", err);
      });
   },
});

export const { logout, setCurrentUser } = auth.actions;
export default auth.reducer;

