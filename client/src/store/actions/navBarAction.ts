import { TOGGLE_DARK_MODE, TOGGLE_DROPDOWN_LEADERBOARD, TOGGLE_DROPDOWN_STAT } from "../types";
export interface toggleType {
    type: string,
    value:boolean
}
export const toggleAction = (pValue:boolean):toggleType => {
    return {
        type: TOGGLE_DARK_MODE,
        value:pValue
    }
}
export const dropdownStatAction = (pValue:boolean):toggleType => {
    return {
        type: TOGGLE_DROPDOWN_STAT,
        value:pValue,
    }
}
export const dropdownLeaderboardAction = (pValue:boolean):toggleType => {
    return {
        type: TOGGLE_DROPDOWN_LEADERBOARD,
        value:pValue,
    }
}