import { leaderboardType } from '../actions/leaderboardAction';
import { IState } from '../../pages/Leaderboard';
import {DISPLAY_LEADERBOARD} from "../types";

const defaultState: IState={};
export const leaderboardReducer = (state=defaultState,action: leaderboardType):IState => {
    switch (action.type) {
        case DISPLAY_LEADERBOARD:
            return {...state};
    
        default:
            return state;
    }
}