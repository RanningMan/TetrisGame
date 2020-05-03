import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import NextBoard from '../../components/NextBoard/NextBoard';

const Next = () => {
    const pieceQueue = useSelector((store: RootState) => store.playground.pieceQueue);
    const nextPiece = pieceQueue.length > 1 ? pieceQueue[1] : null;
    return (
        <NextBoard piece={nextPiece} />
    )
}

export default Next;