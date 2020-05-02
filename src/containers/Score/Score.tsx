import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers/rootReducer';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';

const Score = () => {
    const score = useSelector((store: RootState) => store.score.score);
    const line = useSelector((store: RootState) => store.score.line);

    return (
        <ScoreBoard score={score} level={Math.floor(line / 10) + 1} line={line} />
    )
}

export default Score;