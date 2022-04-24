import { RootState } from "@store/store";

export const selectNavBar = (state: RootState) => state.navBar;
export const selectSideNav = (state: RootState) => state.sideNav;
export const selectSimul = (state: RootState) => state.simul;
export const selectCoefs = (state: RootState) => state.coefs;
export const selectFavorites = (state: RootState) => state.favorites;

// * Auth
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
