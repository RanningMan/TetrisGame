import React, { useRef, useEffect } from 'react';
import { PlaygroundCanvasProps } from './PlaygroundCanvas.interface';
import { Constants, BlockState } from '../../constants';
import { Grid } from '../../containers/Playground/Playground.interface';

const PlaygroundCanvas = (props: PlaygroundCanvasProps) => {
    const playgroundRef = useRef<HTMLCanvasElement>(null);

    const grid: Grid = props.grid;

    useEffect(() => {
        const drawPiece = (ctx: CanvasRenderingContext2D, topLeft: Array<number>, i: number, j: number) => {
            if(grid[i][j].state === BlockState.EMPTY) {
                ctx.strokeRect(topLeft[1] + j * Constants.PIECE_SIZE, topLeft[0] + i * Constants.PIECE_SIZE, Constants.PIECE_SIZE, Constants.PIECE_SIZE);
            }
            else {
                ctx.fillRect(topLeft[1] + j * Constants.PIECE_SIZE, topLeft[0] + i * Constants.PIECE_SIZE, Constants.PIECE_SIZE, Constants.PIECE_SIZE);
            }
        }

        var canvas = playgroundRef.current;
        if (canvas) {
            var ctx = canvas.getContext('2d');

            const topLeft = Constants.PLAYGROUND_TOPLEFT;

            if(ctx) {
                ctx.clearRect(topLeft[0], topLeft[1], Constants.PLAYGROUNDCANVAS_WIDTH, Constants.PLAYGROUNDCANVAS_HEIGHT);
                for(let i = 0; i < Constants.PLAYGROUND_HEIGHT; i++) {
                    for(let j = 0; j < Constants.PLAYGROUND_WIDTH; j++) {
                        drawPiece(ctx, topLeft, i, j);
                    }
                }
            }
        }
    }, [grid])

    return (
        <canvas ref={playgroundRef} width={Constants.PLAYGROUNDCANVAS_WIDTH} height={Constants.PLAYGROUNDCANVAS_HEIGHT}>
            Please use a newer verison of browser to play the game.
        </canvas>
    )
}

export default PlaygroundCanvas;