import { ScoreState } from "../../containers/Score/Score.interface"
import ActionTypes from "../actionTypes"
import { UpdateScoreAction, ScoreActions, UpdateLineAction } from "../actions/scoreActions/scoreActions.interface"

const initialState: ScoreState = {
    score: 0,
    line: 0
}

const BPS_ScoringSystem = (lineCleared: number): number => {
    if(lineCleared === 1) {
        return 40;
    }
    else if(lineCleared === 2) {
        return 100;
    }
    else if(lineCleared === 3) {
        return 300;
    }
    else if(lineCleared === 4) {
        return 1200;
    }
    return 0;
}

export const scoreReducer = (scoreState: ScoreState = initialState, action: ScoreActions): ScoreState => {
    switch(action.type) {
        case ActionTypes.UPDATE_SCORE: {
            const updateScoreAction = action as UpdateScoreAction;
            return {
                ...scoreState,
                score: scoreState.score + BPS_ScoringSystem(updateScoreAction.payload.lineCleared)
            };
        }
        case ActionTypes.UPDATE_LINE: {
            const updateLineAction = action as UpdateLineAction;
            return {
                ...scoreState,
                line: scoreState.line + updateLineAction.payload.lineCleared
            };
        }
        default: {
            return scoreState;
        }
    }
}