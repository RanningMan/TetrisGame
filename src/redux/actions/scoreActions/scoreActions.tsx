import { UpdateScoreAction, UpdateLineAction } from "./scoreActions.interface";
import ActionTypes from "../../actionTypes";

export const updateScore = (lineCleared: number): UpdateScoreAction => {
    return {
        type: ActionTypes.UPDATE_SCORE,
        payload: {
            lineCleared: lineCleared
        }
    }
}

export const updateLine = (lineCleared: number): UpdateLineAction => {
    return {
        type: ActionTypes.UPDATE_LINE,
        payload: {
            lineCleared: lineCleared
        }
    }
}