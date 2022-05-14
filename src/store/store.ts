import logger from "redux-logger";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import auth from "@store/slices/auth";
import coefs from "@store/slices/coefs";
import favorites from "@store/slices/favorites";
import multiForm from "@store/slices/multiform";
import navBar from "@store/slices/navBar";
import sideNav from "@store/slices/sideNav";

const makeStore = () =>
   configureStore({
      reducer: {
         navBar,
         sideNav,
         simul: multiForm,
         auth,
         coefs,
         favorites,
      },
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(thunk).concat(logger),
   });

const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

