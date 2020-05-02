import React from 'react'

import { ScoreBoardProps } from './ScoreBoard.interface'

const ScoreBoard = (props: ScoreBoardProps) => {
    return (
        <div>
            Score: {props.score}
            Level: {props.level}
            Line: {props.line}
        </div>
    )
}

export default ScoreBoard;