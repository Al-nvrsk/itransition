import React from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table'
import { DataType } from '../types/types';

interface TableDataProps {
    userData?: DataType[]
    tableRef: React.Ref<HTMLDivElement>
}

export const TableData = (props:TableDataProps) => {
    const {userData , tableRef} = props

    const columns: ColumnsType<DataType> = [
        {
            title: 'Position',
            dataIndex: 'key',
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'name',
        },
        {
            title: 'Adress',
            dataIndex: 'address',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
        },
    ];

    return (
        <Table 
            ref={tableRef}
            columns={columns}
            dataSource={userData} 
            size="middle" 
            pagination={false}
        />
    )
}
