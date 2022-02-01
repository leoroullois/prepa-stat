import { DISPLAY_LEADERBOARD } from "../types";
export interface leaderboardType {
	type: string;
}
export const leaderboardAction = (): leaderboardType => {
	return {
		type: DISPLAY_LEADERBOARD,
	};
};
// printStat: () => dispatch(leaderboardAction()),
export const printStat = () => (dispatch: any) => {
	dispatch(leaderboardAction());
};
