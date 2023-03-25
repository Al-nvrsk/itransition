export interface UserSchema {
    id?: string;
    key?: string;
    firstName?: string;
    secondName?: string;
    password?: string;
    email?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string
}

export interface ErrorType {
    response: {
        data: {
            message: string
        }
    }
}
