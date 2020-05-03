import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/reducers/rootReducer';
import PlaygroundCanvas from '../../components/PlaygroundCanvas/PlaygroundCanvas';
import { Grid, CurrentPiecePosition, Piece } from './Playground.interface';
import { Constants, PIECE_STATE, BlockState } from '../../constants';
import { pieceGenerate } from '../../util';
import { generatePiece, loadPlayground } from '../../redux/actions/playgroundActions/playgroundActions';
import { incrementTimer, stopTimer } from '../../redux/actions/timerActions/timerActions';
import { updateLine, updateScore } from '../../redux/actions/scoreActions/scoreActions';

const isValidPosition = (row: number, col: number) => {
    if(row < 0 || row  >= Constants.PLAYGROUND_HEIGHT || col < 0 || col >= Constants.PLAYGROUND_WIDTH) {
        return false;
    }
    return true;
}

const clearPieceBlock = (grid: Grid) => {
    for(let i = 0; i < Constants.PLAYGROUND_HEIGHT; i++) {
        for(let j = 0; j < Constants.PLAYGROUND_WIDTH; j++) {
            if(grid[i][j].state !== BlockState.STABLED) {
                grid[i][j] = {
                    state: BlockState.EMPTY,
                    type: undefined
                }
            }
        }
    }
}

const canClearLine = (grid: Grid) => {
    for(let i = 0; i < grid.length; i++) {
        let canClear = true;
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j].state === BlockState.EMPTY) {
                canClear = false;
            }
        }
        if(canClear) {
            return true;
        }
    }
}

const tryClearLine = (grid: Grid): number => {
    let lineCleared = 0;
    for(let i = 0; i < grid.length; i++) {
        let canClear = true;
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j].state === BlockState.EMPTY) {
                canClear = false;
            }
        }
        if(canClear) {
            for(let r = i; r > 0; r--) {
                grid[r] = [...grid[r - 1]];
            }
            grid[0] = new Array(Constants.PLAYGROUND_WIDTH).fill({
                state: BlockState.EMPTY,
                type: undefined
            });
            lineCleared++;
        }
    }
    return lineCleared;
}

const refillPieceBlock = (grid: Grid, row: number, col: number, piece: Piece) => {
    clearPieceBlock(grid);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (isValidPosition(row + i, col + j) && grid[i + row][j + col].state !== BlockState.STABLED) {
                grid[i + row][j + col] = { ...piece.piece[i][j] };
            }
        }
    }
}

const canMoveTo = (grid: Grid, piece: Piece, row: number, col: number): boolean => {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(piece.piece[i][j].state === BlockState.OCCUPIED) {
                if(!isValidPosition(row + i, col + j)) {
                    return false;
                }
                if(grid[row + i][col + j].state === BlockState.STABLED) {
                    return false;
                }
            }
        }
    }

    return true;
}

const stablize = (grid: Grid) => {
    for(let i = 0; i < Constants.PLAYGROUND_HEIGHT; i++) {
        for(let j = 0; j < Constants.PLAYGROUND_WIDTH; j++) {
            if(grid[i][j].state === BlockState.OCCUPIED) {
                grid[i][j].state = BlockState.STABLED;
            }
        }
    }
}

const moveDown = (grid: Grid, piece: Piece, row: number, col: number): CurrentPiecePosition | null => {
    if(!canMoveTo(grid, piece, row + 1, col)) {
        return null;
    }

    refillPieceBlock(grid, row + 1, col, piece);

    return {row: row + 1, col: col};
}

const moveLeft = (grid: Grid, piece: Piece, row: number, col: number): CurrentPiecePosition => {
    if(!canMoveTo(grid, piece, row, col - 1)) {
        return {row: row, col: col};
    }
    refillPieceBlock(grid, row, col - 1, piece);

    return {row: row, col: col - 1};
}

const moveRight = (grid: Grid, piece: Piece, row: number, col: number): CurrentPiecePosition => {
    if(!canMoveTo(grid, piece, row, col + 1)) {
        return {row: row, col: col};
    }
    refillPieceBlock(grid, row, col + 1, piece);

    return {row: row, col: col + 1};
}

const rotate = (grid: Grid, piece: Piece, row: number, col: number): Piece => {
    const direction = (piece.direction + 1) % PIECE_STATE[piece.type].length;
    const currentPiece = pieceGenerate(piece.type, direction);
    if(!canMoveTo(grid, currentPiece, row, col)) {
        return piece;
    }
    else {
        refillPieceBlock(grid, row, col, currentPiece);
        return currentPiece;
    }
}

const moveDownStable = (grid: Grid, piece: Piece, row: number, col: number) => {
    for(let i = Constants.PLAYGROUND_HEIGHT - 1; i > row; i--) {
        if(canMoveTo(grid, piece, i, col)) {
            refillPieceBlock(grid, i, col, piece);
            return {row: i, col: col};
        }
    }
    return {row: row, col: col};
}

const Playground = ()=> {
    let grid: Grid = useSelector((store: RootState) => store.playground.grid);    
    const timer = useSelector((store: RootState) => store.timer);
    const currentPieceQueue = useSelector((store: RootState) => store.playground.pieceQueue);
    
    const [pos, setPos] = useState<CurrentPiecePosition>({row: 0, col: 3});
    const [currentPiece, setCurrentPiece] = useState<Piece>(currentPieceQueue[0]);
    const [staleTime, setStaleTime] = useState<number>(timer.currentTime);
    const [redrawTime, setRedrawTime] = useState<number>(0);
    const [isDirectDown, setIsDirectDown] = useState<boolean>(false);
    
    const dispatch = useDispatch();

  
    useEffect(() => {
        const timerInterval = setInterval(() => dispatch(incrementTimer()), 1000);

        return () => {
            console.log('clear side effects.');
            clearInterval(timerInterval);
        }
    }, [dispatch]);

    useEffect(() => {
        const currentTime = timer.currentTime;
        const keyDownHandler = (e: KeyboardEvent) => {
            if(currentPiece && pos && !isDirectDown && pos.row >= 1) {
                switch(e.keyCode) {
                    case 32: {
                        const newPos = moveDownStable(grid, currentPiece, pos.row, pos.col);
                        setPos(newPos);
                        setIsDirectDown(true);
                        break;
                    }
                    case 37: {
                        const newPos = moveLeft(grid, currentPiece, pos.row, pos.col);
                        setPos(newPos);
                        break;
                    }
                    case 38: {
                        const newPiece = rotate(grid, currentPiece, pos.row, pos.col);
                        setCurrentPiece(newPiece);
                        break;
                    }
                    case 39: {
                        const newPos = moveRight(grid, currentPiece, pos.row, pos.col);
                        setPos(newPos);
                        break;
                    }
                    case 40: {
                        const newPos = moveDown(grid, currentPiece, pos.row, pos.col);
                        if(newPos) {
                            setPos(newPos);
                        }
                        break;
                    }
                    default: {
                        console.log(`Invalid keyboard event: ${e}`);
                        break;
                    }
                }
                setRedrawTime(currentTime);
                dispatch(loadPlayground(grid));
            }
            else {
                console.log(`Invalid keyboard event: ${e}`);
            }
        }

        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        }
    });

    useEffect(() => {
        const currentTime = timer.currentTime;

        const shouldEndCurrentPieceCycle = () => {
            if(!currentPiece) {
                return true;
            }
            
            if((currentTime - staleTime) === 25) {
                return true;
            }

            if(isDirectDown) {
                setIsDirectDown(false);
                return true;
            }
            
            const canMoveDown = canMoveTo(grid, currentPiece, pos.row + 1, pos.col);
            if(!canMoveDown && canClearLine(grid)) {
                return true;
            }

            if(!canMoveDown && (currentTime - redrawTime) >= 1) {
                return true;
            }

            return false;
        }

        if(shouldEndCurrentPieceCycle()) {
            stablize(grid);
            const lineCleared = tryClearLine(grid);
            if(lineCleared > 0) {
                dispatch(updateLine(lineCleared));
                dispatch(updateScore(lineCleared));
            }
            dispatch(generatePiece());
            
            const newPiece = currentPieceQueue[0];
            if(!canMoveTo(grid, newPiece, 0, 3)) {
                dispatch(stopTimer());
                alert('Game Over!');
            }
            setCurrentPiece(newPiece);
            setPos({row: 0, col: 3});
            setStaleTime(currentTime);

        }
        else {
            if(!currentPiece) {
                console.error('currentPiece is null or undefined!');
                throw Error('currentPiece is null or undefined!');
            }

            const newPos = moveDown(grid, currentPiece, pos.row, pos.col);
            if(newPos) {
                setPos(newPos);
            }
        }

        dispatch(loadPlayground(grid));
        
    }, [timer, dispatch]);

    return (
        <PlaygroundCanvas grid={grid} redraw={redrawTime} />
    )
}

export default Playground;
