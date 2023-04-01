import { create } from 'zustand'
import  immer  from 'immer'
import { devtools } from 'zustand/middleware'
import { Socket } from 'socket.io-client'

interface RoomProps {
    id: string,
    players: string,
    game: string,
    status: string
}

interface RoomStoreSchema {
    Rooms: RoomProps[]
    setRooms: (roomArr: RoomProps[]) => void,
}

export const useRoomStore = create<RoomStoreSchema>()(immer((set) => ({
    Rooms: null,
    setRooms: (roomArr: RoomProps[]) => set(() => ({Rooms:roomArr})),
})))

