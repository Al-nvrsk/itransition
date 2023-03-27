import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { MessageSchema } from "../../../types/types";

export const columns: ColumnsType<MessageSchema> = [
    { 
        title: 'Title',
        dataIndex: 'title',
        key: 'title',},
    { 
        title: 'From',
        dataIndex: 'from',
        key: 'from' },
    {   
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt', sorter: (a, b) => {
            const dateA = moment(a.createdAt, 'DD.MM.YYYY, HH:mm:ss');
            const dateB = moment(b.createdAt, 'DD.MM.YYYY, HH:mm:ss');
            return dateA > dateB ? 1 : -1;
        }, 
        defaultSortOrder: 'descend',
    },
    
];
