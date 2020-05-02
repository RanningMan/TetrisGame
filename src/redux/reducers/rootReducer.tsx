import { combineReducers } from 'redux';
import { playgroundReducer } from './playgroundReducer';
import { scoreReducer } from './scoreReducer';
import { timerReducer } from './timerReducer';

export const rootReducer = combineReducers({
    playground: playgroundReducer,
    score: scoreReducer,
    timer: timerReducer
});

export type RootState = ReturnType<typeof rootReducer>;