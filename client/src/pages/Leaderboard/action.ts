import { DISPLAY_LEADERBOARD } from "./type";
export interface leaderboardType {
    type: string
}
export const leaderboardAction = ():leaderboardType => {
    return {
        type: DISPLAY_LEADERBOARD
    }
}