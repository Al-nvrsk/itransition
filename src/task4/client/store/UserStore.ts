import { UserSchema } from "../types/types"

export default class UserStore {
    private _isAuth: boolean
    private _user: UserSchema
    constructor() {
        this._isAuth = false
        this._user = {}
    }
    setIsAuth(bool:boolean){
        this._isAuth = bool
    }
    setUser(user:UserSchema){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    
}
