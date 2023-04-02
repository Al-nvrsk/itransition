import React, { useState } from 'react';
import './Board.scss';
import { Square } from '../Square/Square';
import { useRoomStore } from '../../../../store/roomStore';
import { useAppStore } from '../../../../store/appStore';
import { PlayerProps, TicTacToeGameState } from '../../../../types/types';

export const Board = () => {
	const roomState = useRoomStore(state => state.currentRoomState)
	const ticTacToeState = useRoomStore(state => state.currentRoomState?.gameState as TicTacToeGameState)
	const currentUserName = useAppStore(state => state.currentUserName)
	const socket = useAppStore(state => state.socket)

	const moveUserName = ticTacToeState?.currentPlayer?.playerName
	const xPlayer = 'x';
	const oPlayer = 'o';
	const [ player, setPlayer ] = useState(false ? xPlayer : oPlayer);
	const [ winner, setWinner ] = useState({ indices: new Set() } as any);

	const handleClick = (key: number) => {
		socket?.current.emit('action', {
			gridIndex: key,
			roomId: roomState.id,
			game: 'TicTacToe'
		})
	};

	return (
		<>
			<div className="header">
				{
					moveUserName && moveUserName===currentUserName 
						? `Your move`
						: `Waiting for opponent move`
				}
			</div>
			<div className="board-container">
				{
					ticTacToeState?.board?.map((value , i) => {
						return (
							<Square
								key={i}
								value={(value as PlayerProps).symbol}
								nextValue={(value as PlayerProps).symbol}
								onClick={() => handleClick(i)}
								isWinner={winner.indices.has(i)}
							/>
						);
					})
				}
			</div>
		</>
	);
};

