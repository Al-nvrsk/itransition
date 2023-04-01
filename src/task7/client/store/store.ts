import { create } from 'zustand'
import  immer  from 'immer'
import { devtools } from 'zustand/middleware'
import { Socket } from 'socket.io-client'

interface PlayerProps {
    id: string
    playerName: string
    symbol: string
}

interface TicTacToeGameState {
    board?: Array<string>
    currentPlayer?: PlayerProps | null
    players?: PlayerProps[]
    result?: Record<string, string>
}

interface TicTacToeState {
    game: string
    gameState: TicTacToeGameState
    id: string
}

interface TicTacToeStoreSchema {
    currentUserName: string
    setCurrenUserName?: (name: string) => void,
    ticTacToeState: TicTacToeState
    changeTicTacToeState? : (value: TicTacToeState) => void
    socket?: React.MutableRefObject<Socket>,
    setSocket?: (value: React.MutableRefObject<Socket>) => void
}

export const useTicTacToeStore = create<TicTacToeStoreSchema>()(immer((set) => ({
    socket: null,
    currentUserName: '',
    setCurrenUserName: (name: string) => set(() => ({currentUserName: name})),
    changeTicTacToeState: (value: TicTacToeState) => set(() => ({ticTacToeState: value})),
    setSocket: (value: React.MutableRefObject<Socket>) => set(() =>({socket: value}))
})))

