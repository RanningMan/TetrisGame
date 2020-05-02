import ActionTypes from "../actionTypes"
import { TimerActions } from "../actions/timerActions/timerActions.interface";
import { TimerState } from "../../containers/Playground/Timer.interface";

const initialState: TimerState = {
    currentTime: 0
}

export const timerReducer = (timerState: TimerState = initialState, action: TimerActions): TimerState => {
    switch(action.type) {
        case ActionTypes.TIMER_START:
            return {
                currentTime: 0
            };
        case ActionTypes.TIMER_INCREMENT:
            return {
                currentTime: timerState.currentTime + 1
            };
        case ActionTypes.TIMER_STOP: 
            return {
                currentTime: -1
            };
        default: {
            return timerState;
        }
    }
}