import ActionTypes from "../../actionTypes";
import { TimerActions } from "./timerActions.interface";

export const startTimer = (): TimerActions => {
    return {
        type: ActionTypes.TIMER_START
    }
}

export const incrementTimer = (): TimerActions => {
    return {
        type: ActionTypes.TIMER_INCREMENT
    }
}

export const stopTimer = (): TimerActions => {
    return {
        type: ActionTypes.TIMER_STOP
    }
}