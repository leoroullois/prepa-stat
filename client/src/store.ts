import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { layoutReducer } from "./components/Layout/reducer";
import { leaderboardReducer } from "./pages/Leaderboard/reducer";
import { statsReducer } from "./pages/Stats/reducer";
import { subNavReducer } from "./components/SubNav/reducer";
import { navBarReducer } from "./components/NavBar/reducer";
import { layoutReducer } from "./pages/Layout/reducer";
import { sideNavReducer } from "./components/SideNav/reducer";
import { errorReducer } from "./pages/auth/errorReducer";
import { authReducer } from "./pages/auth/authReducer";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	layout: layoutReducer,
	leaderboard: leaderboardReducer,
	stats: statsReducer,
	subNav: subNavReducer,
	navBar: navBarReducer,
	resNavBar: sideNavReducer,
	auth: authReducer,
	errors: errorReducer,
});

export const store = createStore(
	rootReducer,
	compose(applyMiddleware(...middleware), composeEnhancers())
);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
