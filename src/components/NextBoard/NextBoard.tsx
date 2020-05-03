import React, { useRef, useEffect } from 'react';

import { NextBoardProps } from './NextBoard.interface';
import { Constants, BlockState } from '../../constants';
import { Grid } from '../../containers/Playground/Playground.interface';
import { getColor } from '../../util';

const NextBoard = (props: NextBoardProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const piece = props.piece;

    useEffect(() => {

        const drawPiece = (grid: Grid, ctx: CanvasRenderingContext2D, i: number, j: number) => {
            if(grid[i][j].state === BlockState.EMPTY) {
                ctx.save();
                ctx.fillStyle = 'rgb(0, 0, 0, 0)';
                ctx.fillRect(j * Constants.PIECE_SIZE, i * Constants.PIECE_SIZE, Constants.PIECE_SIZE, Constants.PIECE_SIZE);
                ctx.restore();
            }
            else {
                ctx.save();
                ctx.fillStyle = getColor(grid[i][j].type);
                ctx.fillRect(j * Constants.PIECE_SIZE, i * Constants.PIECE_SIZE, Constants.PIECE_SIZE, Constants.PIECE_SIZE);
                ctx.restore();
            }
        }

        if(piece) {
            const pieceGrid = piece.piece;
            var canvas = ref.current;
            if (canvas) {
                var ctx = canvas.getContext('2d');

                if(ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for(let i = 0; i < 4; i++) {
                        for(let j = 0; j < 4; j++) {
                            drawPiece(pieceGrid, ctx, i, j);
                        }
                    }
                }
            }
        }
    }, [piece]);

    return (
        <div>
            <p>Next:</p>
            <br/>
            <canvas ref={ref} width={Constants.PIECE_SIZE * 4} height={Constants.PIECE_SIZE * 4}>
                Please use a newer verison of browser to play the game.
            </canvas>
        </div>
    )
}

export default NextBoard;