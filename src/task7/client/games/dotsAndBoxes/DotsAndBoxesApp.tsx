import { Alert, Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../../../utils/routePath'
import { useAppStore } from '../../store/appStore'
import { useRoomStore } from '../../store/roomStore'
import { DotsAndBoxesGameState } from '../../types/types'
import { ModalWindow } from '../ticTacToe/components/ModalWindow/ModalWindow'
import './DotsAndBoxesApp.scss'
import { colorSelector } from './utils/colorSelector'
import { tint } from './utils/tint'
import { unTint } from './utils/unTint'

export const DotsAndBoxesApp = () => {
    const DotsAndBoxesGameState = useRoomStore(state => state.currentRoomState?.gameState as DotsAndBoxesGameState)
	const currentUserName = useAppStore(state => state.currentUserName)
	const socket = useAppStore(state => state.socket)
    const roomState = useRoomStore(state => state.currentRoomState)
    const navigate = useNavigate()
    const [isFinishGame, setIsFinishGame] = useState(false)
    const appError = useAppStore(state => state.appError)
    const setAppError = useAppStore(state => state.setError)
	const setRoomState = useRoomStore(state=>state.setCurrentRoomState)

    const turnUserName = DotsAndBoxesGameState?.currentPlayer?.playerName

    useEffect(() => {
		if (!currentUserName) {
			navigate(routePath.task7)
		}
        if (
            roomState?.roomStatus==='win' || 
            roomState?.roomStatus==='draw'
            ) {
            setIsFinishGame(true)
        }
	},[roomState?.roomStatus])

    const onTint = (event: React.MouseEvent<HTMLInputElement>) => {
        return tint({event, DotsAndBoxesGameState, currentUserName, turnUserName})
    }

    const onUnTint = (event: React.MouseEvent<HTMLInputElement>) => {
        return unTint({event, DotsAndBoxesGameState})
    }

    const onClick = (e: React.MouseEvent) => {
        if (
            !(e.target instanceof HTMLElement) ||
            currentUserName !== turnUserName
            ) {
            return;
        }
        socket?.current.emit('action', {
            userMove: e.target.dataset.coord,
            roomId: roomState.id,
            game: 'DotsAndBoxes'
        })
    } 

    const makeBoard = (boardSize: number) => {
        let cols=[];
        for (let i=0; i<=2*boardSize; i++) {
            let row=[]
            for (let j=0; j<=2*boardSize; j++) {
                if (i%2 === 0) {
                    if (j%2 ===0) {
                        row.push(React.createElement(
                            "div",
                            {
                                className: "dot",
                                id: "dot"+Math.floor(i/2)+","+Math.floor(j/2)},
                            ""
                        ))
                    } else {
                        row.push(React.createElement(
                            "div",
                            {
                                className: "horizContainer", "data-coord":"0,"+Math.floor(i/2)+ "," +Math.floor(j/2),
                                onClick: (e) => onClick(e),
                                style:{backgroundColor: colorSelector(DotsAndBoxesGameState.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)])},
                                onMouseEnter: (e: React.MouseEvent<HTMLInputElement>) => onTint(e),                                                         
                                onMouseLeave: (e: React.MouseEvent<HTMLInputElement>) => onUnTint(e),
                            },
                            ""
                        ))
                    }
                } else {
                    if (j%2 === 0) {
                        row.push(React.createElement(
                            "div",
                            {
                                className: "vertContainer","data-coord":"1,"+Math.floor(j/2)+ "," +Math.floor(i/2),
                                onClick:(e) => onClick(e),
                                style:{backgroundColor: colorSelector(DotsAndBoxesGameState.lineCoordinates["1,"+Math.floor(j/2)+ "," +Math.floor(i/2)])},
                                onMouseEnter: (e: React.MouseEvent<HTMLInputElement>) => onTint(e),
                                onMouseLeave: (e: React.MouseEvent<HTMLInputElement>) => onUnTint(e),
                            },
                            ""
                        ))
                    } else {
                        row.push(React.createElement(
                            "div",
                            {
                                className: "box", 
                                id: "box"+Math.floor(i/2)+','+Math.floor(j/2),
                                style: {backgroundColor: DotsAndBoxesGameState.boxColors[Math.floor(i/2)+','+Math.floor(j/2)]}},
                            ""
                        ))
                    }
                }
            }
            cols.push(React.createElement("div", { className:"row" }, row))
        }
        return (React.createElement("div",{id:"game-board", key:"game-board" },cols))
    }

    const onBackMenu = () => {
        navigate(routePath.task7)
        socket?.current.emit('leaveRoom', {id: roomState.id})
        setRoomState({})
        setAppError('')
    }

    return (
        <div className="game">
            <div className="header">
                {
                appError &&
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Alert
                            message="Warning"
                            description={appError}
                            type="warning"
                            showIcon
                            closable
                            onClose={() => setAppError('')}
                        />
                    </Space>
                }
                <Button onClick={onBackMenu} danger>
					Back to menu
				</Button>
                <h3 className="score"> Red:{DotsAndBoxesGameState?.numRed} </h3>
                <h3 className="score"> Blue:{DotsAndBoxesGameState?.numBlue} </h3>
                <div>
                    {
                        turnUserName && turnUserName===currentUserName 
                            ? `Your move`
                            : `Waiting for opponent move`
                    }
                </div>
            </div>
            <div className="board">
                {makeBoard(DotsAndBoxesGameState?.boardSize)}
            </div>
        <ModalWindow
			title={DotsAndBoxesGameState?.winMessage}
			isOpen={isFinishGame}
			toggle={setIsFinishGame}
		/>
    </div>
    )
}
