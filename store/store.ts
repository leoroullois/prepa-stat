// ! Config
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// ! Reducers
import navBar from "./slices/navBar";
import sideNav from "./slices/sideNav";
import multiForm from "./slices/multiform";
import auth from "./slices/auth";
const middleware = [thunk];

const makeStore = () =>
	configureStore({
		reducer: {
			navBar,
			sideNav,
			simul: multiForm,
			auth,
		},
		middleware,
	});

const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
