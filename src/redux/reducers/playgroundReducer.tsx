import { PlaygroundStoreState, Piece } from '../../containers/Playground/Playground.interface';
import { PlaygroundAction, LoadPlaygroundAction } from '../actions/playgroundActions/playgroundActions.interface';
import ActionTypes from '../actionTypes';
import { Constants, BlockState, PIECE_TYPE, PIECE_STATE } from '../../constants';
import { pieceGenerate } from '../../util';

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const getRandomType = () => {
    const num = getRandomInt(7);
    switch(num) {
        case 0: return PIECE_TYPE.L;
        case 1: return PIECE_TYPE.J;
        case 2: return PIECE_TYPE.S;
        case 3: return PIECE_TYPE.Z;
        case 4: return PIECE_TYPE.STICK;
        case 5: return PIECE_TYPE.SQUARE;
        case 6: return PIECE_TYPE.PYRAMID;
        default: return PIECE_TYPE.L;
    }
}

const getRandomDirection = (type: PIECE_TYPE): number => {
    return getRandomInt(PIECE_STATE[type].length);
}

const getRandomPiece = (): Piece => {
    const newPieceType = getRandomType();
    const newDirection = getRandomDirection(newPieceType);
    return pieceGenerate(newPieceType, newDirection);
}

const initialState: PlaygroundStoreState = {
    grid: new Array(Constants.PLAYGROUND_HEIGHT).fill(0).map(c => new Array(Constants.PLAYGROUND_WIDTH).fill({
        state: BlockState.EMPTY,
        type: undefined
    })),
    pieceQueue: [getRandomPiece(), getRandomPiece()]
}

export const playgroundReducer = (state: PlaygroundStoreState = initialState, action: PlaygroundAction): PlaygroundStoreState => {
    switch(action.type) {
        case ActionTypes.LOAD_GRID: {
            const loadGridAction = action as LoadPlaygroundAction;
            return {
                ...state,
                grid: JSON.parse(JSON.stringify(loadGridAction.payload))
            }
        }
        case ActionTypes.GENERATE_PIECE: {
            const newPiece = getRandomPiece();
            if(state.pieceQueue.length > 0) {
                state.pieceQueue.shift();
            }
            const pieceQueue = [...state.pieceQueue, newPiece];
            return {
                ...state,
                pieceQueue: pieceQueue
            };
        }
        default: {
            return state;
        }
    }
}