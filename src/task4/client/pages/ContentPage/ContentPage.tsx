import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../App";
import { routePath } from "../../../../utils/routePath";
import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import { columns } from "./utils/columns";
import { UserSchema } from "../../types/types";
import { changeAccess, deleteUsers, getAll } from "../../http/userApi";
import { LockOutlined, LogoutOutlined, UnlockOutlined, UserDeleteOutlined } from "@ant-design/icons";
import './ContentPage.css'

export const ContentPage = () => {
    const [allUsers, setAllUsers] = useState<UserSchema[]>([])
    const [selectedRows, setSelectedRows] = useState<UserSchema[] | null>(null)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const context = useContext(Context)
    const navigate = useNavigate()
    
    const logout = () => {
        context?.userContext.setUser({});
        context?.userContext?.setIsAuth(false);
        localStorage.setItem('token', '')
        navigate(routePath.auth)
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[], selectedRows: UserSchema[] | null ) => {
            setSelectedRows(selectedRows)
            setSelectedRowKeys(selectedKeys)
        }
    }

    const getAllUsers = async() => {
        const allUsers = await getAll()
        await setAllUsers(allUsers)
        if (allUsers.find((user) => user.id === context?.userContext.user.id)?.role === 'Blocked'
            || !allUsers.find((user) => user.id === context?.userContext.user?.id)) {
                logout()
        }
    }

    const changestatus = async(status: string) => {
        if (!selectedRows) {
            return
        }
        selectedRows?.map(user => user.role = status)
        await changeAccess(selectedRows)
        setSelectedRowKeys([])
    }

    const onDeleteBtn = async() => {
        if (!selectedRows) {
            return
        }
        await deleteUsers(selectedRows)
        setSelectedRowKeys([])
    }

    useEffect(() => {
        getAllUsers() 
    }, [selectedRowKeys])

    return (
        <div>
            <div className="btnConteiner">
                <UnlockOutlined 
                    style={{ fontSize: '32px' }} 
                    className="unblockBtn" 
                    onClick={() => changestatus('Active')}
                />
                <LockOutlined 
                    style={{ fontSize: '32px' }} 
                    className="blockBtn" 
                    onClick={() => changestatus('Blocked')}
                />
                <UserDeleteOutlined 
                    style={{ fontSize: '32px' }} 
                    className="deleteBtn" 
                    onClick={onDeleteBtn} 
                />
                <LogoutOutlined 
                    style={{ fontSize: '32px' }} 
                    className="logoutBtn" 
                    onClick={logout} 
                />
            </div>
            <Divider>
                Current user id = {context?.userContext.user.id}
            </Divider>
            <Table
                rowSelection={{
                type: 'checkbox',
                ...rowSelection,
                }}
                columns={columns}
                dataSource={allUsers}
                pagination={false}
            />
        </div>
    )
}
