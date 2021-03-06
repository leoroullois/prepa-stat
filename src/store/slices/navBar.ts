import { createSlice } from "@reduxjs/toolkit";

interface IState {
   darkMode: boolean;
   leaderboard: boolean;
   stats: boolean;
}

const init = (): IState => {
   return {
      darkMode: false,
      leaderboard: false,
      stats: false,
   };
};

const navBar = createSlice({
   name: "navBar",
   initialState: init(),
   reducers: {
      toggleDarkMode: (state) => {
         state.darkMode = !state.darkMode;
      },
      setColorMode: (state, action) => {
         state.darkMode = action.payload;
      },
      toggleDropdownLeaderboard: (state) => {
         state.leaderboard = !state.leaderboard;
         state.stats = false;
      },
      toggleDropdownStats: (state) => {
         state.stats = !state.stats;
         state.leaderboard = false;
      },
   },
});
export const {
   toggleDarkMode,
   setColorMode,
   toggleDropdownLeaderboard,
   toggleDropdownStats,
} = navBar.actions;

export default navBar.reducer;

