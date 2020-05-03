import React from 'react'

import { ScoreBoardProps } from './ScoreBoard.interface';
import classes from './ScoreBoard.module.css';

const ScoreBoard = (props: ScoreBoardProps) => {
    return (
        <div className={classes.ScoreBoard}>
            <div className={classes.Element}>Score: {props.score}</div>
            <div className={classes.Element}>Level: {props.level}</div>
            <div className={classes.Element}>Line: {props.line}</div>
        </div>
    )
}

export default ScoreBoard;