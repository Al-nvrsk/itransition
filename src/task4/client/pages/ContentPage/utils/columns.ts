import type { ColumnsType } from 'antd/es/table';
import { UserSchema } from '../../../types/types';

export const columns: ColumnsType<UserSchema> = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'First name',
        dataIndex: 'firstName',
    },
    {
        title: 'Second name',
        dataIndex: 'secondName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Registration date',
        dataIndex: 'createdAt',
    },
    {
        title: 'Last login date',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Status',
        dataIndex: 'role',
    },
];
