import { io, Socket } from "socket.io-client";
import { RoomState } from "../types/types";

interface SocketConnectProps {
    currentUserName: string | undefined,
    socket: React.MutableRefObject<Socket | undefined> ,
    setSocket: (value: React.MutableRefObject<Socket | undefined >) => void,
    setCurrentRoomState: (value: RoomState) => void,
    setRooms: (value: RoomState[]) => void,
    setError: (value: string) => void
}

export const SocketConnect = (props: SocketConnectProps) => {
    const {currentUserName, socket, setSocket, setCurrentRoomState, setRooms, setError} = props 
    
    if (currentUserName) {
        console.log('socket', __SOCKET_IO_HOST__)
        socket.current = io(__SOCKET_IO_HOST__)
        setSocket(socket)

        socket.current.on("connect", () => {
            socket.current?.emit("getRoomList")
        });

        socket.current.on("gameState", (arg) => {
            setCurrentRoomState(arg)
        });
            
        socket.current.on("roomList", (arg) =>{
            setRooms(arg)
        })
            
        socket.current.on("error", (arg) => {
            setError(arg)
        })    
    }
    
}
