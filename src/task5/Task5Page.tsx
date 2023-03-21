import React from 'react';
import { faker } from '@faker-js/faker'
import { useState, UIEvent, useEffect, useRef } from 'react';
import { ErrorNumberInput } from './components/ErrorNumberInput';
import { RadioRegion } from './components/RadioRegion';
import { createUserList } from './utils/createUserList';
import { SeedInput } from './components/SeedInput';
import { TableData } from './components/TableData';
import {Row, Col, Button, Space } from 'antd';
import './Task5Page.css'
import { DataType, RegionType } from './types/types';
import { errorMaker } from './utils/errorMaker';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { DownloadOutlined } from '@ant-design/icons'
import { SizeType } from 'antd/es/config-provider/SizeContext';

export const Task5Page = () => {
    const [size] = useState<SizeType>('large')
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    const [region, setRegion] = useState<RegionType>('en')
    const [seed, setSeed] = useState('')
    const [errorNumber, setErrorNumber] = useState(0)
    const [userData, setUserData] = useState<DataType[]>()
    const [partData, setPartData] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        setUserData(createUserList(seed, partData))
            if (errorNumber>=0.5 ) {
                const changed = userData?.map((value) => {
                    return(
                        { 
                            key: value.key,
                            id: value.id,
                            name: errorMaker(value.name, errorNumber, region),
                            address: errorMaker(value.address, errorNumber, region),
                            phone: errorMaker(value.phone,errorNumber, region)
                        }
                    ) 
                })
                setUserData(changed)
            }
        }, [seed, region, errorNumber, partData])

    region && faker.setLocale(region) 
    const langs = ['en', 'cz', 'ru' , 'es']
    
    const onScroll = (e: UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop > scrollPosition){
            setScrollPosition(e.currentTarget.scrollTop)
            console.log(e.currentTarget.scrollTop)
            setPartData(partData+1)
        }
    }

    const onChangeError = (value: number) => {
        setErrorNumber(value)
        return 
    }

    return (
        <div className='main' onScroll={onScroll}>
            <Row justify={'center'}>
                <Col>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <RadioRegion langs={langs} setRegion={setRegion} />
                        <ErrorNumberInput onChanged={onChangeError} errorNumber={errorNumber} />
                        <SeedInput seed={seed} setSeed={setSeed} />
                        <Row justify={'center'} >
                            <Button onClick={onDownload} type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                                Download
                            </Button>
                        </Row>
                    </Space>
                </Col>
            </Row>
            <TableData tableRef={tableRef}  userData={userData} />
        </div>
    )
}

