import { Button, Space, Table } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreateMessageModal } from '../../components/CreateMessageModal';
import { CreateNameModal } from '../../components/CreateNameModal';
import { columns } from './utils/columns';
import { AdressNameListType, MessageSchema } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../../../utils/routePath';
import { createConnection } from '../../http/connectWs';
import './MessagePage.css'

export const MessagePage = () => {
    const [data, setData] = useState<MessageSchema[]>()
    const [isMessageModalOpened, setIsMessageModalOpened] = useState<boolean>(false);
    const [isNameModalOpened, setIsNameModalOpened] = useState<boolean>(true);
    const [currentUserName, setCurrentUserName] = useState<string>('')
    const [userList, setUserList] = useState<AdressNameListType[]>([])
    const naigate = useNavigate()
    const socketRef = useRef<WebSocket>()

    useEffect(() => {
        createConnection({currentUserName, socketRef, setData, setUserList})
    }, [currentUserName])

    const toggleMessageModal = useCallback(() => {
        setIsMessageModalOpened((prevState) => !prevState);
    }, []);

    const onExit = useCallback(() => {
        socketRef.current?.close()
        naigate(routePath.menu)
    }, [])

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <div className='btnConteiner'>
                    <Button 
                        type="primary"
                        disabled={!socketRef.current?.OPEN} 
                        onClick={() => setIsMessageModalOpened(true)}
                        className='btn'
                    >
                        New Message
                    </Button>
                    <Button 
                        type={'default'} 
                        onClick={onExit}
                        className='btn'
                        danger
                    >
                        Exit
                    </Button>
                </div>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.messageText}</p>,
                        rowExpandable: (record) => record.title !== 'Not Expandable',
                    }}
                    dataSource={data}
                />
            </Space>
            <CreateMessageModal 
                isOpen={isMessageModalOpened} 
                toggle={toggleMessageModal}
                currentUser={currentUserName}
                socket={socketRef}
                options={userList}
            />
            <CreateNameModal 
                isOpen={isNameModalOpened} 
                toggle={setIsNameModalOpened} 
                changeName={setCurrentUserName}
            />
        </>
    )
}
