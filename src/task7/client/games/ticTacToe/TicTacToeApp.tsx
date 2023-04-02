import React, { useEffect, useState } from 'react';
import './TicTacToe.scss';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import { Board } from './components/Board/Board';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../../../utils/routePath';
import { useAppStore } from '../../store/appStore';
import { useRoomStore } from '../../store/roomStore';
import { TicTacToeGameState } from '../../types/types';
import { Alert, Button, Space } from 'antd';


export const TicTacToeApp = () => {
	const ticTacToeState = useRoomStore(state => state.currentRoomState)
	const setRoomState = useRoomStore(state=>state.setCurrentRoomState)
	const currentUserName = useAppStore(state => state.currentUserName)
	const socket = useAppStore(state => state.socket)
	const appError = useAppStore(state => state.appError)
	const setAppError = useAppStore(state => state.setError)
	const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false)
	const [isFinishGame, setIsFinishGame] = useState(false)
	const [finishText, setFinishText] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (!currentUserName) {
			navigate(routePath.task7)
		}
	},[])
	
	useEffect(() => {
		if (ticTacToeState?.players && ticTacToeState.players?.length === 1) {
			setIsWaitingModalOpen(true)
		}
		if (ticTacToeState?.players && ticTacToeState.players?.length > 1) {
			setIsWaitingModalOpen(false)
		}
		if (ticTacToeState?.roomStatus === 'draw'){
			setIsFinishGame(true)
			setFinishText('draw')
		}
		if (ticTacToeState?.roomStatus === 'win') {
			setIsFinishGame(true)
			setFinishText( (ticTacToeState.gameState as TicTacToeGameState).winner?.playerName === currentUserName 
				? 'You win'
				: 'You lose'
				)
		}
	},[ticTacToeState])

	const onBackMenu = () => {
		navigate(routePath.task7)
		socket?.current.emit('leaveRoom', {id: ticTacToeState.id})
		setRoomState({})
		setAppError('')
	}

	return (
		<div id="app">
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
			{
				!isWaitingModalOpen &&
					<Board />
			}
			<ModalWindow
				title='Waiting for player' 
				isOpen={isWaitingModalOpen}
				toggle={setIsWaitingModalOpen}
			/>
			<ModalWindow
				title={finishText }
				isOpen={isFinishGame}
				toggle={setIsFinishGame}
			/>
		</div>
	);
}
