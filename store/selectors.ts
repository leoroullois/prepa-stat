import { RootState } from "@store/store";

export const selectNavBar = (state: RootState) => state.navBar;
export const selectDarkMode = (state: RootState) => state.navBar.darkMode;

export const selectSideNav = (state: RootState) => state.sideNav;
export const selectSimul = (state: RootState) => state.simul;
export const selectCoefs = (state: RootState) => state.coefs;
export const selectFavorites = (state: RootState) => state.favorites;
export const selectSchools = (state: RootState) => state.schools;

// * Auth
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

