import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../../../../../utils/routePath';
import { useTicTacToeStore } from '../../../../store/store';

interface ModalWindowProps {
    isOpen: boolean;
    toggle: (isNameEntered: boolean) => void;
    title: string;
    isRematchBtn?: boolean
    // changeName: (name: string) => void
}

export const ModalWindow = (props: ModalWindowProps) => {
    const socket = useTicTacToeStore(state => state.socket)
    const currentUserName = useTicTacToeStore(state=> state.currentUserName)
    const { isOpen, toggle, title, isRematchBtn } = props;
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()

    const onReturn = () => {
        socket?.current.emit('rematch')
        toggle(false)
    }

    const onBackMenu = () => {
        navigate(routePath.task7, { state: { userName: currentUserName  } })
        toggle(false)
        socket?.current.emit('leaveRoom')
    }

    return (
        <Modal 
            open={isOpen}
            title={title}
            footer={null}
        >
            <Space direction="horizontal">
                <Button 
                    key="menu" 
                    onClick={onBackMenu}
                >
                    Back to menu
                </Button>
                {isRematchBtn &&
                    <Button 
                        key="rematch" 
                        onClick={onReturn}
                    >
                        Rematch
                    </Button>
                }
            </Space>
        </Modal>
    );
};
