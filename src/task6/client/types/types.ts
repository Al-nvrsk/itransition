export interface MessageSchema {
    id?: string
    key?: string
    title?: string
    messageText?: string
    from?: string
    createdAt?: string
    addressName?: string
    label?:string
}

export interface AdressNameListType {
    ladel: string
    value: string
}

export type CurrentUserName = string
