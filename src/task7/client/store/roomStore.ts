import { create } from 'zustand'
import  immer  from 'immer'
import { RoomSchema, RoomState } from '../types/types'


export const useRoomStore = create<RoomSchema>()(immer((set) => ({
    currentRoomState: null,
    roomList: [],
    setCurrentRoomState: (value: RoomState) => set(() => ({currentRoomState: value})),
    setRoomList: (value: RoomState[]) => set(() => ({roomList: value})) ,
})))

