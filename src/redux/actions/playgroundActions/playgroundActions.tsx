import { Grid } from "../../../containers/Playground/Playground.interface";
import ActionTypes from "../../actionTypes";


export const loadPlayground = (grid: Grid) => {
    return {
        type: ActionTypes.LOAD_GRID,
        payload: grid
    };
}

export const generatePiece = () => {
    return {
        type: ActionTypes.GENERATE_PIECE
    }
}