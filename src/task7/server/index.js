import {io} from '../../task4/server/server.js'
import {UserStat} from './types/userStat.js'

export 

 let rooms = []

  export const createRoom = (socket) => {
    return (data) => {
        if (rooms.some(el => el.id === socket.id)) {
            return
        }
        const gameState = {
            room: null,
            game: null,
            board: new Array(9).fill(''),
            currentPlayer: null,
            players: [],
            result: {
                status: UserStat.WAITING,
            },
          };
        
        const nextSymbol = "x";
        
        const newPlayer = {
                playerName: data.playerName,
                id: socket.id,
                symbol: nextSymbol,
            };

        const room = {
            id: socket.id,
            gameState: gameState,
            game: data.game,
        }
        room.gameState.players.push(newPlayer)
        
            rooms.push(room)
            socket.join(room.id)
            io.emit("roomList", rooms) 
    }
}

    export const getRoomList = (socketId) => {
        return () => {
            rooms = rooms.filter(room => room.gameState.players.length > 0)
            io.emit("roomList", rooms)
        }
    }

    export const joinRoom = (socket) => {
        return (data) => {
            const index = rooms.findIndex(el => el.id === data.id)

            socket.join(rooms[index].id)
            
            const numberOfPlayers = rooms[index].gameState?.players?.length;
            if (numberOfPlayers >= 2) {
                return;
            }

            let nextSymbol = "x";
            if (numberOfPlayers === 1) {
                if (rooms[index].gameState.players[0].symbol === "x") {
                    nextSymbol = "o";
                }
            }
    
            const newPlayer = {
                playerName: data.playerName,
                id: socket.id,
                symbol: nextSymbol,
            };

            rooms[index].gameState.players.push(newPlayer);
            if (rooms[index].gameState.players.length === 2) {
                rooms[index].gameState.result.status = UserStat.PLAYING;
                rooms[index].gameState.currentPlayer = newPlayer;
            }

            io.to(rooms[index].id).emit("gameState", rooms[index])
        }
    }

    export const leaveRoom = (socket) => {
        return (data) => {
            rooms = rooms.filter(el => el.id !== socket.id)
            socket.leave(socket.id)
            io.emit("roomList", rooms)
        }
    }

    export function action(socketId) {
        return (data) => {
            const index = rooms.findIndex(el => el.id === data.roomId)
            if(rooms[index]) {
            if (
                rooms[index].gameState.result.status === UserStat.PLAYING &&
                rooms[index].gameState.currentPlayer.id === socketId
            ) {
                const player = rooms[index].gameState.players.find((p) => p.id === socketId);
                if (rooms[index].gameState.board[data.gridIndex] == '') {
                    rooms[index].gameState.board[data.gridIndex] = player;
                    rooms[index].gameState.currentPlayer = rooms[index].gameState.players.find((p) => p !== player);
                    checkForEndOfGame(index);
                }
            }
            io.to(rooms[index].id).emit("gameState", rooms[index])
        }
        };
    }

    export function rematch(socketId) {
        return (data) => {
            if (gameState.players.findIndex((p) => p.id === socketId) < 0) return; // Don't let spectators rematch
            if (
                gameState.result.status === UserStat.WIN ||
                gameState.result.status === UserStat.DRAW
            ) {
                resetGame();
                io.emit("gameState", gameState);
            }
        };
    }

    function resetGame(index) {
        rooms[index].gameState.board = new Array(9).fill('');

        if (rooms[index].gameState.players.length === 2) {
            rooms[index].gameState.result.status = UserStat.PLAYING;
            const randPlayer = Math.floor(Math.random() * rooms[index].gameState.players.length);
            rooms[index].gameState.currentPlayer = rooms[index].gameState.players[randPlayer];
        } else {
            rooms[index].gameState.result.status = UserStat.WAITING;
            rooms[index].gameState.currentPlayer = null;
        }
    }

    export function disconnect(socketId) {
        return (reason) => {
            rooms.filter(room => room.id !==socketId )
            const index = rooms.findIndex(el => el.id === socketId)
            if (rooms[index]) {
                rooms[index].gameState.players = rooms[index].gameState.players.filter((p) => p.id != socketId);
                rooms.filter(room => room.gameState.players.length > 0)
                    if (rooms[index].gameState.players !== 2) {
                        resetGame(index);
                       
                        io.to(rooms[index]?.id).emit("gameState", rooms[index].gameState);
                    }
            }
        };
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

    function checkForEndOfGame(index) {
        // Check for a win
        rooms[index].gameState.players.forEach((player) => {
            winPatterns.forEach((seq) => {
                if (
                    rooms[index].gameState.board[seq[0]] == player &&
                    rooms[index].gameState.board[seq[1]] == player &&
                    rooms[index].gameState.board[seq[2]] == player
                ) {
                    rooms[index].gameState.result.status = UserStat.WIN;
                    rooms[index].gameState.result.winner = player;
                }
            });
        });

        // Check for a draw
        if (rooms[index].gameState.result.status != UserStat.WIN) {
            const emptyBlock = rooms[index].gameState.board.indexOf('');
            if (emptyBlock == -1) {
                rooms[index].gameState.result.status = UserStat.DRAW;
            }
        }
    }
