import { DISPLAY_STAT } from "../types";
export interface statsType {
    type: string
}
export const statsAction = ():statsType => {
    return {
        type: DISPLAY_STAT
    }
}
// printStat: () => dispatch(statsAction()),
export const printStat = () => (dispatch:any) => {
    dispatch(statsAction())
}