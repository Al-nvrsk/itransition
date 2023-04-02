import { io } from '../../task4/server/server.js'
import { RoomStatus } from './types/RoomStatus.js'
import { initStateTicTacToe, ticTacToeActions } from './ticTacToeServer.js'
import { initStateDotAndBoxes, dotsAndBoxesActions } from './dotAndBoxesServer.js'
import { v4 as uuidv4 } from 'uuid'

const rooms = []

export const createRoom = (socket) => {
    return (data) => {
        if (rooms.some(el => el.id === socket.id)) {
            return
        }

        const room = {
            id: uuidv4(),
            gameState: null,
            game: data.game,
            roomStatus: RoomStatus.WAITING,
            players: [
                {
                    playerName: data.playerName,
                    id: socket.id,
                }
            ]
        }

        data.game === 'TicTacToe'
            ? (
                room.gameState = initStateTicTacToe(data, socket),
                room.players[0].symbol = "x"
            )
            : room.gameState = initStateDotAndBoxes()

        rooms.push(room)
        socket.join(room.id)
        io.to(room.id).emit("gameState", room)
        io.emit("roomList", rooms)
    }
}

export const getRoomList = (socketId) => {
    return () => {
        io.emit("roomList", rooms)
    }
}

export const leaveRoom = (socket) => {
    return (data) => {
        rooms = rooms.filter(el => el.id !== socket.id)
        socket.leave(socket.id)
        io.emit("roomList", rooms)
    }
}

export const joinRoom = (socket) => {
    return (data) => {
        const index = rooms.findIndex(el => el.id === data.id)
        const numberOfPlayers = rooms[index].players.length;
        if (numberOfPlayers >= 2) {
            return;
        }

        socket.join(rooms[index].id)
        const newPlayer = {
            playerName: data.playerName,
            id: socket.id,
        };

        let nextSymbol = "x";
        if (numberOfPlayers === 1 && rooms[index].game === 'TicTacToe') {
            if (rooms[index].gameState.players[0]?.symbol === "x") {
                nextSymbol = "o";
                newPlayer.symbol = nextSymbol
            }
        }

        rooms[index].players.push(newPlayer);
        if (rooms[index].players.length === 2) {
            rooms[index].roomStatus = RoomStatus.PLAYING;
            rooms[index].gameState.currentPlayer = newPlayer;
        }

        io.to(rooms[index].id).emit("gameState", rooms[index])
        io.emit("roomList", rooms)
    }
}

export function action(socket) {
    return (data) => {
        const index = rooms.findIndex(el => el.id === data.roomId)
        if (rooms[index]) {
            if (
                rooms[index].roomStatus === RoomStatus.PLAYING &&
                rooms[index].gameState.currentPlayer.id === socket.id
            ) {
                const changedRoom = rooms[index].game === 'TicTacToe'
                    ? ticTacToeActions(rooms[index], socket.id, data)
                    : dotsAndBoxesActions(rooms[index], socket.id, data)
                rooms.slice(index, 1, changedRoom)
            }
            io.to(rooms[index].id).emit("gameState", rooms[rooms.length - 1])
        }
    };
}

export function disconnect(socket) {
    return (data) => {
        const index = rooms.findIndex(room => room.id === data.id)
        if (index >= 0) {
            socket.leave(rooms[index].id)
            io.to(rooms[index].id).emit("error", 'Opponent was disconnected');
            rooms.splice(index, 1)
        }
        io.emit("roomList", rooms)

    };
}
