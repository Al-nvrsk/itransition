import React, { useContext, useEffect, useState } from 'react';
import './TicTacToe.scss';
import { useTicTacToeStore } from '../../store/store';
import { ModalWindow } from './components/ModalWindow/ModalWindow';
import Board from './components/Board/Board';
import { useLocation, useNavigate } from 'react-router-dom';
import { routePath } from '../../../../utils/routePath';


export const TicTacToe = () => {
	const ticTacToeState = useTicTacToeStore(state => state.ticTacToeState?.gameState)
	const currentUserName = useTicTacToeStore(state => state.currentUserName)
	const moveUserName = useTicTacToeStore(state => state.ticTacToeState?.gameState?.currentPlayer?.playerName)
	const socket = useTicTacToeStore(state => state.socket)
	const [ isReadyPlay, setIsReadyPlay ] = useState(false);
	const [isWaitingModalOpen, setIsWaitingModalOpen] = useState(false)
	const [ connected, setConnected ] = useState(false);
	const [ isInRoom, setisInRoom ] = useState(true); //false
	const [ roomId, setRoomId ] = useState('');
	const [ playerNumberFn, setPlayerNumberFn ] = useState(() => () => 0);

	const [isFinishGame, setIsFinishGame] = useState(false)
	const [finishText, setFinishText] = useState('')

	const [ restart, setRestart ] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		if (!currentUserName) {
			navigate(routePath.task7)
		}
	},[])
	
	
	useEffect(() => {
		if (ticTacToeState?.players && ticTacToeState.players?.length === 1) {
			// setIsReadyPlay(true)
			setIsWaitingModalOpen(true)
		}
		if (ticTacToeState?.players && ticTacToeState.players?.length > 1) {
			setIsReadyPlay(true)
			setIsWaitingModalOpen(false)
		}
		if (ticTacToeState?.result?.status === 'draw'){
			setIsFinishGame(true)
			setFinishText('draw')
		}
		if (ticTacToeState?.result?.status === 'win') {
			setIsFinishGame(true)
			setFinishText( ticTacToeState?.result?.winner?.playerName === currentUserName 
				? 'You win'
				: 'You lose')
		}

		// setIsReadyPlay(true)
	},[socket,  ticTacToeState])

	return (
			<div id="app">
				
				{!isWaitingModalOpen &&
				<Board setGameOver={setIsGameOver} shouldRestart={restart} />}

				<ModalWindow
					title='Waiting for player' 
					isOpen={isWaitingModalOpen}
					toggle={setIsWaitingModalOpen}
				/>
				<ModalWindow
			title={finishText }
			isOpen={isFinishGame}
			toggle={setIsFinishGame}
			isRematchBtn
		/>
			</div>
	);
}
