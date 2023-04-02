import { RoomStatus } from './types/RoomStatus.js'

export const initStateTicTacToe = (data, socket) => {
    const nextSymbol = "x";

    const newPlayer = {
        playerName: data.playerName,
        id: socket.id,
        symbol: nextSymbol,
    };

    const gameState = {
        board: new Array(9).fill(''),
        currentPlayer: null,
        players: [],
        result: {},
    };

    gameState.players.push(newPlayer)

    return gameState
}

export const ticTacToeActions = (room, socketId, data) => {
    const player = room.players.find((p) => p.id === socketId);
    if (room.gameState.board[data.gridIndex] == '') {
        room.gameState.board[data.gridIndex] = player;
        room.gameState.currentPlayer = room.players.find((p) => p.id !== player.id);
        checkForEndOfGame(room);
    }
    return room
}



const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function checkForEndOfGame(room) {
    room.players.forEach((player) => {
        winPatterns.forEach((seq) => {
            if (
                room.gameState.board[seq[0]].id === player.id &&
                room.gameState.board[seq[1]].id === player.id &&
                room.gameState.board[seq[2]].id === player.id
            ) {
                room.roomStatus = RoomStatus.WIN;
                room.gameState.winner = player;
            }
        });
    });

    if (room.roomStatus != RoomStatus.WIN) {
        const emptyBlock = room.gameState.board.indexOf('');
        if (emptyBlock == -1) {
            room.roomStatus = RoomStatus.DRAW;
        }
    }
    return room
}
