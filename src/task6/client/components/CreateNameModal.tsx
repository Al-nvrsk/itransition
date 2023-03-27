import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../../../utils/routePath';

interface CreateNameModalProps {
    isOpen: boolean;
    toggle: (isNameEntered: boolean) => void;
    changeName: (name: string) => void
}

export const CreateNameModal = (props: CreateNameModalProps) => {
    const { isOpen, toggle, changeName } = props;
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()

const onClick = () => {
    changeName(inputValue)
    toggle(false)
}

    return (
        <Modal 
            open={isOpen}
            title="Input user name"
            footer={null}
        >
            <Form onFinish={onClick} layout="vertical">
                <Form.Item>
                    <Input 
                        placeholder="user name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Space direction="horizontal">
                        <Button
                            key="submit"
                            htmlType="submit"
                            type="primary"
                            disabled={inputValue.length<1}
                        >
                            Enter
                        </Button>
                        <Button 
                            key="back" 
                            onClick={() => navigate(routePath.menu)}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
