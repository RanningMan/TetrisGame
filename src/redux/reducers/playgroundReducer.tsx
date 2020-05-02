import { PlaygroundStoreState } from '../../containers/Playground/Playground.interface';
import { PlaygroundAction, LoadPlaygroundAction } from '../actions/playgroundActions/playgroundActions.interface';
import ActionTypes from '../actionTypes';
import { Constants, BlockState } from '../../constants';

const initialState: PlaygroundStoreState = {
    grid: new Array(Constants.PLAYGROUND_HEIGHT).fill(0).map(c => new Array(Constants.PLAYGROUND_WIDTH).fill({
        state: BlockState.EMPTY,
        type: undefined
    }))
}

export const playgroundReducer = (state: PlaygroundStoreState = initialState, action: PlaygroundAction): PlaygroundStoreState => {
    switch(action.type) {
        case ActionTypes.LOAD_GRID: {
            const loadGridAction = action as LoadPlaygroundAction;
            return {
                ...state,
                grid: loadGridAction.payload
            }
        }
        default: {
            return state;
        }
    }
}