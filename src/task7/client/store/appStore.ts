import { Socket } from "socket.io-client"
import { create } from 'zustand'
import  immer  from 'immer'
import { AppStateSchema } from "../types/types"

export const useAppStore = create<AppStateSchema>()(immer((set) => ({
    socket: null,
    currentUserName: '',
    setCurrenUserName: (name: string) => set(() => ({currentUserName: name})),
    setSocket: (value: React.MutableRefObject<Socket>) => set(() =>({socket: value})),
    appError: null,
    setError: (error: string) => set(() =>({appError: error}))
})))
