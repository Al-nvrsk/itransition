import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useTicTacToeStore } from "../store/store";

// TODO: fix type
export const SocketConnect = (
    currentUserName: string,
    socket: React.MutableRefObject<Socket | undefined> ,
    setSocket: any,
    changeTicTacToeState: any,
    setRooms: any
    ) => { 
    if (currentUserName) {
            socket.current = io('http://localhost:5001')
            setSocket(socket)
            socket.current.on("connect", () => {
                console.log(socket.current?.id); // x8WIv7-mJelg7on_ALbx
                });
            socket.current.on("gameState", (arg) => {
                changeTicTacToeState(arg)
                    console.log('arg', arg); // x8WIv7-mJelg7on_ALbx
                    });
            socket.current.on("roomList", (arg) =>{
                setRooms(arg)
                console.log("roomList", arg)
            })    
        }
    
}
