import { leaderboardType } from './action';
import { IState } from './Leaderboard';
import {DISPLAY_LEADERBOARD} from "./type";

const defaultState: IState={};
export const leaderboardReducer = (state=defaultState,action: leaderboardType):IState => {
    switch (action.type) {
        case DISPLAY_LEADERBOARD:
            return {...state};
    
        default:
            return state;
    }
}