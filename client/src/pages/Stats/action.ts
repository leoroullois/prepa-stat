import { DISPLAY_STAT } from "./type";
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