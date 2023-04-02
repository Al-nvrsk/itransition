import { Socket } from "socket.io-client"

export interface PlayerProps {
    id: string
    playerName: string
    symbol?: string
}

export interface TicTacToeGameState {
    board: Array<string | PlayerProps>
    currentPlayer?: PlayerProps
    players: PlayerProps[]
    result?: Record<string, string>
    winner?: PlayerProps
}

export interface RoomState {
    gameState?: TicTacToeGameState | DotsAndBoxesGameState
    id?: string,
    players?: PlayerProps[],
    game?: string,
    roomStatus?: string,
}

export interface RoomSchema {
    currentRoomState: RoomState
    roomList: RoomState[]
    setCurrentRoomState: (value: RoomState | undefined) => void
    setRoomList: (value: RoomState[]) => void
}

export interface AppStateSchema {
    currentUserName?: string
    setCurrenUserName?: (name: string) => void,
    socket?: React.MutableRefObject<Socket> ,
    setSocket: (value: React.MutableRefObject<Socket | undefined>) => void
    appError?: string
    setError: (error: string) => void
}

export interface DotsAndBoxesGameState {
    boardSize: number
    numRed: number
    numBlue: number
    turn: string
    winMessage: string
    lineCoordinates: string[]
    boxColors: string[]
    currentPlayer?: PlayerProps
}
