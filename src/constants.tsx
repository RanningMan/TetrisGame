
const PLAYGROUND_WIDTH = 10;
const PLAYGROUND_HEIGHT = 22;
const PIECE_SIZE = Math.min(window.innerWidth * 0.6 / PLAYGROUND_WIDTH, window.innerHeight * 0.8 / PLAYGROUND_HEIGHT);
const PLAYGROUNDCANVAS_WIDTH = PIECE_SIZE * PLAYGROUND_WIDTH + 10;
const PLAYGROUNDCANVAS_HEIGHT = PIECE_SIZE * PLAYGROUND_HEIGHT + 10;

export const Constants = {
    APP_NAME: 'Tetrix',
    PLAYGROUND_WIDTH: PLAYGROUND_WIDTH,
    PLAYGROUND_HEIGHT: PLAYGROUND_HEIGHT,
    PLAYGROUND_TOPLEFT: [0, 0],
    PLAYGROUNDCANVAS_WIDTH: PLAYGROUNDCANVAS_WIDTH,
    PLAYGROUNDCANVAS_HEIGHT: PLAYGROUNDCANVAS_HEIGHT,
    PIECE_SIZE: PIECE_SIZE,
}

export enum PIECE_TYPE {
    STICK = 'STICK',
    L = 'L',
    J = 'J',
    S = 'S',
    Z = 'Z',
    SQUARE = 'SQUARE',
    PYRAMID = 'PYRAMID'
}

export const PIECE_STATE = {
    STICK: [
        [[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]],
        [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]]
    ],
    L: [
        [[0,1,0,0], [0,1,0,0], [0,1,1,0], [0,0,0,0]],
        [[0,0,0,0], [0,0,1,0], [1,1,1,0], [0,0,0,0]],
        [[0,1,1,0], [0,0,1,0], [0,0,1,0], [0,0,0,0]],
        [[0,0,0,0], [1,1,1,0], [1,0,0,0], [0,0,0,0]]
    ],
    J: [
        [[0,0,1,0], [0,0,1,0], [0,1,1,0], [0,0,0,0]],
        [[0,0,0,0], [1,1,1,0], [0,0,1,0], [0,0,0,0]],
        [[0,1,1,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]],
        [[0,0,0,0], [1,0,0,0], [1,1,1,0], [0,0,0,0]]
    ],
    S: [
        [[0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0]],
        [[0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,0,0]]
    ],
    Z: [
        [[0,0,0,0], [1,1,0,0], [0,1,1,0], [0,0,0,0]],
        [[0,0,1,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]]
    ],
    SQUARE: [
        [[0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0]]
    ],
    PYRAMID: [
        [[0,1,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
        [[0,1,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]],
        [[0,0,0,0], [1,1,1,0], [0,1,0,0], [0,0,0,0]],
        [[0,1,0,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]]
    ]
}

export enum BlockState {
    EMPTY = 0,
    OCCUPIED = 1,
    STABLED = 2
}