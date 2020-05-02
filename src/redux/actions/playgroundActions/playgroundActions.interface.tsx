import ActionTypes from "../../actionTypes";
import { Grid } from "../../../containers/Playground/Playground.interface";

export interface LoadPlaygroundAction {
    type: typeof ActionTypes.LOAD_GRID;
    payload: Grid;
}

export type PlaygroundAction = LoadPlaygroundAction;