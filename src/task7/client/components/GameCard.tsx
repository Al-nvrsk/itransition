import { Card } from "antd"
import { RoomState } from "../types/types"

interface GameCardProps {
    roomsList: RoomState[]
    onSetRoom: (id?: string) => void
}

export const GameCard = (props: GameCardProps) => {
    const {roomsList, onSetRoom} = props
    
    return (
        <Card title="Game online">
            {
                roomsList.length>0 
                    ? roomsList.map(room => (
                        <Card.Grid 
                            className="card" 
                            key={room.id}
                            onClick={()=>onSetRoom(room?.id)}
                        >
                            <p>
                                <b>Game:</b> {room.game}
                            </p>
                            <div>
                                <b>Users:</b> {room.players?.map(user => (
                                    <p key={user.id} >
                                        {user.playerName}
                                    </p>
                                ))}
                            </div>
                            <p>
                                <b>Status:</b> {room.roomStatus}
                            </p>
                        </Card.Grid>
                    ))
                    : 'No games online'
            }
        </Card>
    )
}
