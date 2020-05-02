import ActionTypes from "../../actionTypes";

export interface UpdateScoreAction {
    type: typeof ActionTypes.UPDATE_SCORE,
    payload: {
        lineCleared: number
    }
}

export interface UpdateLineAction {
    type: typeof ActionTypes.UPDATE_LINE,
    payload: {
        lineCleared: number
    }
}

export type ScoreActions = UpdateLineAction | UpdateScoreAction;