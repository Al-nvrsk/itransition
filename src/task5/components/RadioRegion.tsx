import React from 'react'
import { Radio, Row } from 'antd'
import { RegionType } from '../types/types'


interface radioProps {
    langs: string[]
    setRegion: (arg0: RegionType) => void
}

export const RadioRegion = (props: radioProps) => {
    const {langs, setRegion} = props
    return (
        <Row justify={'center'} >
            <Radio.Group 
                defaultValue={langs[0]}
                buttonStyle="solid"
                onChange={(e) => setRegion(e.target.value)}
            >
                {langs.map(lang => (
                    <Radio.Button 
                        key={lang}
                        value={lang}
                    >
                        {lang}
                    </Radio.Button>))
                }
            </Radio.Group>
        </Row>
    )
}
