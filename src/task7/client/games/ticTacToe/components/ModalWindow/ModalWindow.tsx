import { Button, Modal, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../../../../../utils/routePath';
import { useAppStore } from '../../../../store/appStore';
import './ModalWindow.scss'
import { useRoomStore } from '../../../../store/roomStore';
interface ModalWindowProps {
    isOpen: boolean;
    toggle: (isNameEntered: boolean) => void;
    title: string;
}

export const ModalWindow = (props: ModalWindowProps) => {
    const { isOpen, toggle, title } = props;
    const socket = useAppStore(state => state.socket)
    const roomState = useRoomStore(state => state.currentRoomState)
    const currentUserName = useAppStore(state=> state.currentUserName)
    const navigate = useNavigate()

    const onBackMenu = () => {
        navigate(routePath.task7, { state: { userName: currentUserName  } })
        toggle(false)
        socket?.current.emit('leaveRoom', {id: roomState.id})
    }

    return (
        <Modal 
            open={isOpen}
            title={title}
            footer={null}
            onCancel={onBackMenu}
        >
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
