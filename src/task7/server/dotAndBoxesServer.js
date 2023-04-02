import { RoomStatus } from './types/RoomStatus.js'

export const initStateDotAndBoxes = (size = 3) => {
    let state = {
        boardSize: size,
        numRed: 0,
        numBlue: 0,
        turn: "red",
        winMessage: "",
        lineCoordinates: {},
        boxColors: {},
        currentPlayer: null
    }
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < state.boardSize + 1; j++) {
            for (let k = 0; k < state.boardSize; k++) {
                state.lineCoordinates[i + "," + j + "," + k] = 0
            }
        }
    }
    for (let i = 0; i < state.boardSize; i++) {
        for (let j = 0; j < state.boardSize; j++) {
            state.boxColors[i + "," + j] = "rgb(255,255,255)"
        }
    }
    return state
}

export const dotsAndBoxesActions = (room, socketId, data) => {
    const currentCoord = data.userMove
    if (room.gameState.lineCoordinates[currentCoord] === 0) {
        let newState = room.gameState.lineCoordinates
        newState[currentCoord] = room.gameState.turn === "red" ? 1 : -1
        room.gameState.lineCoordinates = newState

        const splitCoord = currentCoord.split(',')
        let i = splitCoord[0]
        let j = splitCoord[1]
        let k = splitCoord[2]
        let newBoxColors = room.gameState.boxColors
        let madeSquare = 0

        if (i === "0") {
            if (checkSquare(room.gameState, j, k) === 4) {
                madeSquare = 1
                newBoxColors[j + ',' + k] = (room.gameState.turn === "red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
                room.gameState.numRed = (room.gameState.turn === "red") ? room.gameState.numRed + 1 : room.gameState.numRed,
                    room.gameState.numBlue = (room.gameState.turn === "blue") ? room.gameState.numBlue + 1 : room.gameState.numBlue,
                    room.gameState.boxColors = newBoxColors
            }
            if (checkSquare(room.gameState, parseFloat(j) - 1, k) === 4) {
                madeSquare = 1
                newBoxColors[(parseFloat(j) - 1) + ',' + k] = (room.gameState.turn === "red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
                room.gameState.numRed = (room.gameState.turn === "red") ? room.gameState.numRed + 1 : room.gameState.numRed,
                    room.gameState.numBlue = (room.gameState.turn === "blue") ? room.gameState.numBlue + 1 : room.gameState.numBlue,
                    room.gameState.boxColors = newBoxColors
            }
        } else {
            if (checkSquare(room.gameState, k, j) === 4) {
                madeSquare = 1
                newBoxColors[k + ',' + j] = (room.gameState.turn === "red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
                room.gameState.numRed = (room.gameState.turn === "red") ? room.gameState.numRed + 1 : room.gameState.numRed,
                    room.gameState.numBlue = (room.gameState.turn === "blue") ? room.gameState.numBlue + 1 : room.gameState.numBlue,
                    room.gameState.boxColors = newBoxColors
            }
            if (checkSquare(room.gameState, k, parseFloat(j) - 1) === 4) {
                madeSquare = 1
                newBoxColors[k + ',' + (parseFloat(j) - 1)] = (room.gameState.turn === "red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
                room.gameState.numRed = (room.gameState.turn === "red") ? room.gameState.numRed + 1 : room.gameState.numRed,
                    room.gameState.numBlue = (room.gameState.turn === "blue") ? room.gameState.numBlue + 1 : room.gameState.numBlue,
                    room.gameState.boxColors = newBoxColors
            }
        }
        if (madeSquare === 0) {
            room.gameState.turn = room.gameState.turn === "red" ? "blue" : "red"
            room.gameState.currentPlayer = room.players.find((p) => p.id !== socketId);
        } else {
            checkGameOver(room)
        }
    }
}

const checkSquare = (state, j, k) => {
    const checker1 = Math.abs(state.lineCoordinates['0,' + j + ',' + k])
    const checker2 = Math.abs(((parseFloat(j) + 1)) > state.boardSize ? 0 : state.lineCoordinates['0,' + (parseFloat(j) + 1) + ',' + k])
    const checker3 = Math.abs(state.lineCoordinates['1,' + k + ',' + j])
    const checker4 = Math.abs(((parseFloat(k) + 1)) > state.boardSize ? 0 : state.lineCoordinates['1,' + (parseFloat(k) + 1) + ',' + j])
    return checker1 + checker2 + checker3 + checker4
}

const checkGameOver = (room) => {
    room.gameState.winMessage = (room.gameState.numRed + room.gameState.numBlue == room.gameState.boardSize ** 2) ? makeWinMessage(room) : ""
}

const makeWinMessage = (room) => {
    let winMessage
    if (room.gameState.numRed > room.gameState.numBlue) {
        room.roomStatus = RoomStatus.WIN
        winMessage = "Red wins!"
    } else if (room.gameState.numRed < room.gameState.numBlue) {
        winMessage = "Blue wins!"
        room.roomStatus = RoomStatus.WIN
    } else {
        winMessage = "Draw!"
        room.roomStatus = RoomStatus.DRAW
    }
    return (winMessage)
}
