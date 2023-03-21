import { faker } from '@faker-js/faker'

const create = (seed: any, length:any ) => {
    faker.seed(seed)
    const dataArr = new Array(length).fill({}).map((value, index)=>{
        return(
            { 
                key: index,
                id: faker.datatype.uuid(),
                name: faker.name.fullName(),
                address: faker.address.streetAddress(),
                phone: faker.phone.number()
            }
        )
    })
    return dataArr
}

export const createUserList = (seed:string,part: number = 0 ) => {
    const seeded=Number(seed)
    let arr = [...create(seeded,20)]
        while (part>0) {
            arr=[...arr, ...create(seeded+1,10)]
            part--
        }  
    arr.map((value, index) => value.key = index + 1 )
    return arr
}
