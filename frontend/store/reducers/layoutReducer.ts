import { ILayoutState } from "../../pages/Layout";
import { IWindowResize } from "../actions/layoutAction";
import { WINDOW_RESIZE } from "../types";
const init = (): ILayoutState => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
        mainBlack:"#1b1b1b",
        mainWhite:"#f1f1f1",
	};
};
export const layoutReducer = (
	state: ILayoutState = init(),
	action: IWindowResize
) => {
    switch (action.type) {
        case WINDOW_RESIZE:
            return {
                ...state,
                width:action.width,
                height: action.height,
            }
    
        default:
            return state;
    }
};
