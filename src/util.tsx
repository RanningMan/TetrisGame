import { PIECE_TYPE, PIECE_STATE, BlockState } from "./constants";
import { Piece } from "./containers/Playground/Playground.interface";

export const pieceGenerate = (type: PIECE_TYPE, direction: number): Piece => {
    const model = PIECE_STATE[type][direction];
    const piece = model.map(row => {
        return row.map(c => {
            return c === 1 ? {
                state: BlockState.OCCUPIED,
                type: type
            } : {
                state: BlockState.EMPTY,
                type: undefined
            };
        })
    });
    return {
        piece: piece,
        type: type,
        direction: direction
    }
}

export const getColor = (type: PIECE_TYPE | undefined) => {
    switch(type) {
        case PIECE_TYPE.L: return 'red';
        case PIECE_TYPE.J: return 'orange';
        case PIECE_TYPE.S: return 'yellow';
        case PIECE_TYPE.Z: return 'green';
        case PIECE_TYPE.STICK: return 'blue';
        case PIECE_TYPE.SQUARE: return 'indigo';
        case PIECE_TYPE.PYRAMID: return 'violet';
        default: return 'white';
    }
}