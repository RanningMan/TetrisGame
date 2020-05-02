import { BlockState, PIECE_TYPE } from "../../constants";

export interface Block {
    state: BlockState;
    type: PIECE_TYPE | undefined;
}
export type Grid = Array<Array<Block>>;

export interface PlaygroundStoreState {
    grid: Grid;
}

export type CurrentPiece = Array<Array<Block>>;

export interface CurrentPiecePosition {
    row: number;
    col: number;
}