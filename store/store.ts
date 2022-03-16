// ! Config
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// ! Reducers
import navBar from "@store/slices/navBar";
import sideNav from "@store/slices/sideNav";
import multiForm from "@store/slices/multiform";
import auth from "@store/slices/auth";
import coefs from "@store/slices/coefs";
import schools from "@store/slices/schools";

const middleware = [thunk];

const makeStore = () =>
	configureStore({
		reducer: {
			navBar,
			sideNav,
			simul: multiForm,
			auth,
			coefs,
			schools,
		},
		middleware,
	});

const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
