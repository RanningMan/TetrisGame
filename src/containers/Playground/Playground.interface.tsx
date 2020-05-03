import { BlockState, PIECE_TYPE } from "../../constants";

export interface Block {
    state: BlockState;
    type: PIECE_TYPE | undefined;
}
export type Grid = Array<Array<Block>>;

export interface PlaygroundStoreState {
    grid: Grid;
    pieceQueue: Piece[];
}

export interface Piece {
    piece: Array<Array<Block>>;
    type: PIECE_TYPE;
    direction: number;
}

export interface CurrentPiecePosition {
    row: number;
    col: number;
}