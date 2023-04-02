
import { useEffect, useRef, useState } from "react";
import './Task7.scss'
import { CreateNameModal } from "../../task6/client/components/CreateNameModal";
import { SocketConnect } from "./http/socketConnect";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../utils/routePath";
import { useRoomStore } from "./store/roomStore";
import { useAppStore } from "./store/appStore";
import { Button, Card } from "antd";
import { SelectGameWindow } from "./games/ticTacToe/components/ModalWindow/SelectGameWindow";
import { GameCard } from "./components/GameCard";

export const Task7 = () => {
    const setRooms = useRoomStore(state=> state.setRoomList)
    const roomsList = useRoomStore(state => state.roomList)
    const setStateCurrentUserName = useAppStore(state => state.setCurrenUserName)
    const currentUserName = useAppStore(state => state.currentUserName)
    const [isNameModalOpened, setIsNameModalOpened] = useState<boolean>(Boolean(!currentUserName));
    const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false)
    const setSocket = useAppStore(state => state.setSocket)
    const setError = useAppStore(state => state.setError)    
    const setCurrentRoomState = useRoomStore(state => state.setCurrentRoomState)
    const roomState = useRoomStore(state => state.currentRoomState)
    const navigate = useNavigate()
    const socket = useRef<Socket>()
    
    useEffect(() => {
        SocketConnect({currentUserName, socket, setSocket, setCurrentRoomState, setRooms, setError})
    }, [currentUserName])

    useEffect(() => {
        if(roomState?.roomStatus === 'playing') {
            (roomState?.game === 'TicTacToe') 
                ? navigate(routePath.tictactoe)
                : navigate(routePath.dotsandboxes)
        }
    }, [roomState])


    const onSend = () => {
        setIsWaitingModalOpen(true)
        console.log('createRoom')
    }

    const onChange = (value: string) => {
        setStateCurrentUserName!(value)
    } 

    const onSetRoom = (id?: string) => {
        socket.current?.emit("joinRoom", {id, playerName: currentUserName})
    }

    return (
        <>
            <div className="header">
                <Button onClick={onSend} type="primary">
                    Create New Game
                </Button>
            </div>
            <GameCard onSetRoom={onSetRoom} roomsList={roomsList} />
            <SelectGameWindow
					isOpen={isWaitingModalOpen}
					toggle={setIsWaitingModalOpen}
			/>
            <CreateNameModal 
                isOpen={isNameModalOpened} 
                toggle={setIsNameModalOpened} 
                changeName={(value) => onChange(value)}
            />
        </>
    )
}
