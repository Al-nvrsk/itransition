import React from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';
import { useState } from 'react';

interface ErrorNumberInputProps {
    onChanged: (arg0: number) => void
    errorNumber: number
}

export const ErrorNumberInput = (props: ErrorNumberInputProps) => {
    const {onChanged, errorNumber} = props
    const [error, setError] = useState(errorNumber)

    const changedError = (selected: number) => {
        setError(selected)
        if (selected === 0.5) {
            onChanged(Math.round(Math.random()))
        } 
            onChanged(Math.round(selected))
    }

    return (
        <Row justify={'center'}>
            <Col span={12}>
                <Slider
                    min={0}
                    max={10}
                    onChange={(value) => changedError(value)}
                    value={typeof error === 'number' ? error : 0}
                    step={0.25}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={0}
                    max={1000}
                    style={{ margin: '0 16px' }}
                    step={0.25}
                    value={error}
                    onChange={(value) => changedError(value!)}
                />
            </Col>
        </Row>
    )
}
