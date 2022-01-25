import { combineReducers, createStore, compose } from "redux";
// import { layoutReducer } from "./components/Layout/reducer";
import { leaderboardReducer } from "./pages/Leaderboard/reducer";
import { statsReducer } from "./pages/Stats/reducer";
import { subNavReducer } from "./components/SubNav/reducer";
import { navBarReducer } from "./components/NavBar/reducer";
import { loginReducer } from "./pages/Login/reducer";
import { registerReducer } from "./pages/Register/reducer";
import {layoutReducer} from "./pages/Layout/reducer";
import { sideNavReducer } from './components/SideNav/reducer';
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	layout:layoutReducer,
	leaderboard: leaderboardReducer,
	stats: statsReducer,
	subNav: subNavReducer,
	navBar: navBarReducer,
	login: loginReducer,
	register: registerReducer,
	resNavBar:sideNavReducer,
});
export const store = createStore(rootReducer, composeEnhancers());
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
