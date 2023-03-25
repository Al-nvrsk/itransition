import { $host, $authHost } from "."
import jwt_decode from "jwt-decode";
import { UserSchema } from "../types/types";

interface ResponsePropsAuth {
    data: {
        token: string
    }
}

interface ResponsePropsAllUsers {
    data: UserSchema[]
}

export const registration = async (formData: UserSchema) => {
    const {data} = await $host.post<UserSchema,ResponsePropsAuth>('api/user/registration', formData)
    localStorage.setItem('token', data.token)
    const response: UserSchema = jwt_decode(data.token)
    return response
}
export const login = async (email: string, password: string) => {
    const {data} = await $host.post<UserSchema,ResponsePropsAuth>('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    const response: UserSchema = jwt_decode(data.token)
    return response 
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    const response: UserSchema = jwt_decode(data.token)
    return response
}

export const getAll = async () => {
    const {data} = await $authHost.get<any,ResponsePropsAllUsers>('api/user/getAll')
    data.map((value) => {
        value.key = value.id
        const createDate = new Date(value.createdAt as string);
        const loginDate = new Date(value.updatedAt as string) 
        value.createdAt = createDate.toLocaleString()
        value.updatedAt = loginDate.toLocaleString()
    })
    return data
}

export const changeAccess = async (selectedRows:UserSchema[]|null) => {
    await $authHost.post('api/user/changeaccess', {selectedRows})
}

export const deleteUsers = async (selectedRows:UserSchema[]|null) => {
    await $authHost.post('api/user/deleteusers', {selectedRows})
}
