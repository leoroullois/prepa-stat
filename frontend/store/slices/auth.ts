import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { local } from "d3";

const init = (): IAuth => {
	const PUBLIC_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://prepa-stat.herokuapp.com";
	const SERVER_URL =
		process.env.NODE_ENV === "development"
			? "http://localhost:5000"
			: "https://prepa-stat.herokuapp.com";
	return {
		isAuthenticated: false,
		user: {},
		loading: false,
		urls: {
			PUBLIC_URL,
			SERVER_URL,
		},
	};
};

export const login = createAsyncThunk(
	"auth/login",
	async (userData: ILoginState) => {
		const res = await fetch("/se-connecter", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: { "Content-Type": "application/json" },
		});

		return res;
	}
);
export const register = createAsyncThunk(
	"auth/register",
	async (userData: IRegisterState) => {
		const res = await fetch("/s-enregistrer", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res;
	}
);
const auth = createSlice({
	name: "auth",
	initialState: init(),
	reducers: {
		logout: (state) => {
			localStorage.removeItem("jwtItem");
			// setAuthToken(false);
			state = init();
		},
	},
	extraReducers: (builder) => {
		// ? LOGIN
		builder.addCase(login.pending, (state, action: PayloadAction<any>) => {
			const { body } = action.payload;
			console.log("User loading...", body);
		});
		builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
			const { body } = action.payload;
			console.log("Successfully logged in.", body);
			// Save to localStorage
			// Set token to localStorage
			// const { token } = res.body;
			// localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			// setAuthToken(token);
			// Decode token to get user data
			// const decoded = jwt_decode(token);
			// Set current user
			// dispatch(setCurrentUser(decoded));
			// dispatch(setCurrentUser(userData));
		});
		builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
			const { err } = action.payload;
			console.log("Error when logging.", err);
			// console.log("Error when logging.", err);
			// 	return dispatch({
			// 		type: GET_ERRORS,
			// 		payload: err.response.data,
			// 	});
		});

		// ? REGISTER
		builder.addCase(register.pending, (state, action: PayloadAction<any>) => {
			const { body } = action.payload;
			console.log("User loading...", body);
		});
		builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
			const { body } = action.payload;
			console.log("Successfully registered in.", body);
			// Save to localStorage
			// Set token to localStorage
			// const { token } = res.body;
			// localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			// setAuthToken(token);
			// Decode token to get user data
			// const decoded = jwt_decode(token);
			// Set current user
			// dispatch(setCurrentUser(decoded));
			// dispatch(setCurrentUser(userData));
		});
		builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
			const { err } = action.payload;
			console.log("Error when registering.", err);
			// console.log("Error when logging.", err);
			// 	return dispatch({
			// 		type: GET_ERRORS,
			// 		payload: err.response.data,
			// 	});
		});
	},
});

export const { logout } = auth.actions;
export default auth.reducer;
