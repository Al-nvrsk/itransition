import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Form, Input, Modal, Space } from 'antd';
import { RichTextEditor } from './RichTextEditor';
import { convert } from 'html-to-text';

interface OptionsProps {
    value: string
}

interface CreateMessageModalProps {
    currentUser: string
    isOpen: boolean;
    toggle: () => void;
    socket: React.MutableRefObject<WebSocket | undefined>;
    options: OptionsProps[]
}

export const CreateMessageModal = (props: CreateMessageModalProps) => {
    const { isOpen, toggle, currentUser, socket, options } = props;
    const [addressName, setAddressName] = useState('')
    const [messageTitle, setMessageTitle] = useState('')
    const [messageText, setMessageText] = useState('')

    const onSubmit = async () => {
        socket?.current?.send(JSON.stringify({
            addressName: addressName,
            title: messageTitle,
            messageText: messageText,
            from: currentUser,
            type: 'create'
        }))
    
        toggle()
        setAddressName('')
        setMessageTitle('')
        setMessageText('')
    }

    useEffect(() => {
        if (isOpen) {
            socket.current?.send(JSON.stringify({
                type: 'getAllUsers'
            }))
        }
    },[isOpen])

    const onChangeFilter = (inputValue: string, option?: OptionsProps) => {
        return option!.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }

    return (
        <Modal 
            open={isOpen}
            title="New message"
            onCancel={() => toggle()}
            footer={null}
        >
            <Form
                onFinish={onSubmit}
                layout="vertical"
            >
                <Form.Item>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={options}
                        placeholder="User name"
                        filterOption={(inputValue, option) => onChangeFilter(inputValue, option)}
                        onChange={setAddressName}
                    />
                </Form.Item>
                <Form.Item>
                    <Input 
                        placeholder="Message title"
                        onChange={(e) => setMessageTitle(e.target.value)}
                        value={messageTitle}
                    />
                </Form.Item>
                <Form.Item>
                    <RichTextEditor 
                        onChange={(e) => setMessageText(convert(e || ''))}
                        value={messageText}
                    />
                </Form.Item>
                <Form.Item>
                    <Space direction="horizontal">
                        <Button
                            key="submit"
                            htmlType="submit"
                            type="primary"
                            disabled={!addressName || !messageText}
                        >
                            Send
                        </Button>
                        <Button 
                            key="back" 
                            onClick={() => toggle()}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
