import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import PlaygroundCanvas from '../../components/PlaygroundCanvas/PlaygroundCanvas';
import { Grid, CurrentPiecePosition, CurrentPiece } from './Playground.interface';
import ActionTypes from '../../redux/actionTypes';
import { Constants, PIECE_TYPE, PIECE_STATE, BlockState } from '../../constants';

const isValidPosition = (row: number, col: number) => {
    if(row < 0 || row  >= Constants.PLAYGROUND_HEIGHT || col < 0 || col >= Constants.PLAYGROUND_WIDTH) {
        return false;
    }
    return true;
}

const pieceGenerate = (type: PIECE_TYPE, direction: number): CurrentPiece => {
    const model = PIECE_STATE[type][direction];
    return model.map(row => {
        return row.map(c => {
            return c === 1 ? {
                state: BlockState.OCCUPIED,
                type: type
            } : {
                state: BlockState.EMPTY,
                type: undefined
            };
        })
    })
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

const refillPieceBlock = (grid: Grid, row: number, col: number, piece: CurrentPiece) => {
    clearPieceBlock(grid);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (isValidPosition(row + i, col + j) && grid[i + row][j + col].state !== BlockState.STABLED) {
                grid[i + row][j + col] = { ...piece[i][j] };
            }
        }
    }
}

const canMoveTo = (grid: Grid, piece: CurrentPiece, row: number, col: number): boolean => {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if(piece[i][j].state === BlockState.OCCUPIED) {
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

const moveDown = (grid: Grid, piece: CurrentPiece, row: number, col: number): CurrentPiecePosition | null => {
    if(!canMoveTo(grid, piece, row + 1, col)) {
        return null;
    }

    refillPieceBlock(grid, row + 1, col, piece);

    return {row: row + 1, col: col};
}

const moveLeft = (grid: Grid, piece: CurrentPiece, row: number, col: number): CurrentPiecePosition => {
    if(!canMoveTo(grid, piece, row, col - 1)) {
        return {row: row, col: col};
    }
    refillPieceBlock(grid, row, col - 1, piece);

    return {row: row, col: col - 1};
}

const moveRight = (grid: Grid, piece: CurrentPiece, row: number, col: number): CurrentPiecePosition => {
    if(!canMoveTo(grid, piece, row, col + 1)) {
        return {row: row, col: col};
    }
    refillPieceBlock(grid, row, col + 1, piece);

    return {row: row, col: col + 1};
}

const rotate = (grid: Grid, piece: CurrentPiece, type: PIECE_TYPE, direction: number, row: number, col: number): CurrentPiece => {
    const currentPiece = pieceGenerate(type, direction);
    if(!canMoveTo(grid, currentPiece, row, col)) {
        return piece;
    }
    else {
        refillPieceBlock(grid, row, col, currentPiece);
        return currentPiece;
    }
}

const moveDownStable = (grid: Grid, piece: CurrentPiece, row: number, col: number) => {
    for(let i = Constants.PLAYGROUND_HEIGHT - 1; i > row; i--) {
        if(canMoveTo(grid, piece, i, col)) {
            refillPieceBlock(grid, i, col, piece);
            return {row: i, col: col};
        }
    }
    return {row: row, col: col};
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const getRandomType = () => {
    const num = getRandomInt(7);
    switch(num) {
        case 0: return PIECE_TYPE.L;
        case 1: return PIECE_TYPE.J;
        case 2: return PIECE_TYPE.S;
        case 3: return PIECE_TYPE.Z;
        case 4: return PIECE_TYPE.STICK;
        case 5: return PIECE_TYPE.SQUARE;
        case 6: return PIECE_TYPE.PYRAMID;
        default: return PIECE_TYPE.L;
    }
}

const getRandomDirection = (type: PIECE_TYPE): number => {
    return getRandomInt(PIECE_STATE[type].length);
}

const Playground = ()=> {
    let grid: Grid = useSelector((state: RootState) => state.playground.grid);
    
    const timer = useSelector((store: RootState) => store.timer);
    const dispatch = useDispatch();

    const [pos, setPos] = useState<CurrentPiecePosition>({row: 0, col: 3});
    const [currentDirection, setCurrentDirection] = useState<number>(0);
    const [currentPiece, setCurrentPiece] = useState<CurrentPiece>();
    const [currentPieceType, setCurrentPieceType] = useState<PIECE_TYPE>(PIECE_TYPE.L);
    const [staleTime, setStaleTime] = useState<number>(timer.currentTime);
    const [redrawTime, setRedrawTime] = useState<number>(0);
    const [isDirectDown, setIsDirectDown] = useState<boolean>(false);
  
    useEffect(() => {
        const timerInterval = setInterval(() => dispatch({
            type: ActionTypes.TIMER_INCREMENT
        }), 1000);

        return () => {
            console.log('clear side effects.');
            clearInterval(timerInterval);
        }
    }, [dispatch]);

    useEffect(() => {
        const currentTime = timer.currentTime;
        const keyDownHandler = (e: KeyboardEvent) => {
            if(currentPiece && pos && !isDirectDown) {
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
                        const newDirection = (currentDirection + 1) % PIECE_STATE[currentPieceType].length;
                        setCurrentDirection(newDirection);
                        const newPiece = rotate(grid, currentPiece, currentPieceType, newDirection, pos.row, pos.col);
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
                dispatch({
                    type: ActionTypes.LOAD_GRID,
                    payload: JSON.parse(JSON.stringify(grid))
                });
            }
            else {
                console.log(`Invalid keyboard event: ${e}`);
            }
        }

        window.addEventListener('keydown', keyDownHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        }
    })

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
                dispatch({
                    type: ActionTypes.UPDATE_LINE,
                    payload: {
                        lineCleared: lineCleared
                    }
                });
                dispatch({
                    type: ActionTypes.UPDATE_SCORE,
                    payload: {
                        lineCleared: lineCleared
                    }
                });
            }
            const newPieceType = getRandomType();
            const newDirection = getRandomDirection(newPieceType);
            const newPiece = pieceGenerate(newPieceType, newDirection);
            if(!canMoveTo(grid, newPiece, 0, 3)) {
                dispatch({
                    type: ActionTypes.TIMER_STOP
                });
                alert('Game Over!');
            }
            setCurrentPieceType(newPieceType);
            setCurrentDirection(newDirection);
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

        dispatch({
            type: ActionTypes.LOAD_GRID,
            payload: JSON.parse(JSON.stringify(grid))
        });
        
    }, [timer, dispatch]);

    return (
        <>
            <PlaygroundCanvas grid={grid} redraw={redrawTime}/>
        </>
    )
}

export default Playground;
