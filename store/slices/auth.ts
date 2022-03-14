import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEmpty from "is-empty";
import Router from "next/router";
// import { removeJwtToken, setJwtToken } from "../../lib/auth";

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
		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: { "Content-Type": "application/json" },
		}).then((data) => data.json());
		console.log("RES ", res);
		if (!isEmpty(res._doc)) {
			return res;
		} else {
			return rejectWithValue(res.message);
		}
	}
);
export const register = createAsyncThunk(
	"auth/register",
	async (userData: IRegisterForm, { rejectWithValue }) => {
		const res = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((data) => data.json());
		if (!isEmpty(res._doc)) {
			return res;
		} else {
			return rejectWithValue(res.message);
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
			const err = action.payload as string;
			console.log("[REJECTED] ", err);
			state.errors.push(err);
		});

		// ? REGISTER
		builder.addCase(register.pending, (state) => {
			console.log("[PENDING] User loading...");
		});
		builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
			console.log("[FULFILLED] Successfully registered in.", action);
			state.errors = [];
			Router.push("/se-connecter");
		});
		builder.addCase(register.rejected, (state, action) => {
			const err = action.payload as string;
			state.errors.push(err);
			console.log("[REJECTED] ", err);
		});
	},
});

export const { logout, setCurrentUser } = auth.actions;
export default auth.reducer;
