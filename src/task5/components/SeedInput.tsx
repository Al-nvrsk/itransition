import React from "react"
import { faker } from '@faker-js/faker'
import { Input } from 'antd';

const { Search } = Input;

interface SeedInputProps {
    seed: string
    setSeed: (number: string)=>void
}

export const SeedInput = (props:SeedInputProps) => {
    const {seed, setSeed} = props
    return(
        <Search
            placeholder="input seed text"
            allowClear
            enterButton="Random"
            size="large"
            onSearch={()=>setSeed(faker.random.numeric(8))}
            onChange={(e)=>setSeed(e.target?.value)}
            value={seed}
        />
    )
}
