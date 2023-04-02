import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { useAppStore } from '../../../../store/appStore';
import './ModalWindow.scss'
import { useRoomStore } from '../../../../store/roomStore';

interface SelectGameWindowProps {
    isOpen: boolean;
    toggle: (isNameEntered: boolean) => void;
}

export const SelectGameWindow = (props: SelectGameWindowProps) => {
    const socket = useAppStore(state => state.socket)
    const roomState = useRoomStore(state => state.currentRoomState)
    const currentUserName = useAppStore(state=> state.currentUserName)
    const { isOpen, toggle } = props;
    const [gameSelected, setGameSelected] = useState(false)

    const onBackMenu = () => {
        toggle(false)
        if (roomState.id && gameSelected) {
            setGameSelected(false)
        socket?.current.emit('leaveRoom', {id: roomState.id})
        }
    }

    const onSelectGame = (game: string) => {
        socket?.current?.emit("createRoom", { game: game, playerName: currentUserName } )
        setGameSelected(true)
    }

    return (
        <Modal 
            open={isOpen}
            title={!gameSelected ? 'Select game' : 'Waiting for players ...'}
            footer={null}
            onCancel={onBackMenu}
        >
            {
            !gameSelected &&
                <div className='chooseGameBtn'>
                    <Button 
                        type="primary"
                        onClick={() => onSelectGame('TicTacToe')}
                    >
                        Tic Tac Toe
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => onSelectGame('Dots and Boxes')}
                    >
                        Dots and Boxes
                    </Button>
                </div>
            }
            <Space direction="horizontal">
                <Button 
                    key="menu" 
                    onClick={onBackMenu}
                    danger
                >
                    Back to menu
                </Button>
            </Space>
        </Modal>
    );
};
