import ActionTypes from "../../actionTypes";

interface TimerStartAction {
    type: typeof ActionTypes.TIMER_START;
}

interface TimerIncrementAction {
    type: typeof ActionTypes.TIMER_INCREMENT;
}

interface TimerStopAction {
    type: typeof ActionTypes.TIMER_STOP;
}

export type TimerActions = TimerStartAction | TimerIncrementAction | TimerStopAction;