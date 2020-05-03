import ActionTypes from "../../actionTypes";
import { Grid } from "../../../containers/Playground/Playground.interface";
import { PIECE_TYPE } from "../../../constants";

export interface LoadPlaygroundAction {
    type: typeof ActionTypes.LOAD_GRID;
    payload: Grid;
}

export interface GeneratePieceAction {
    type: typeof ActionTypes.GENERATE_PIECE;
    payload: {
        type: PIECE_TYPE;
        direction: number;
    }
}

export type PlaygroundAction = LoadPlaygroundAction | GeneratePieceAction;