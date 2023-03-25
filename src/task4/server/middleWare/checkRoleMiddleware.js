import jwt from 'jsonwebtoken'
import { key } from '../controllers/UserController'

export const checkRoleMiddleware = (role) => {
    return function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer sdfsdhfbsdfb
        if(!token) {
            return res.status(401).json({message: 'Не авторизован!'})
        }
        const decoded = jwt.verify(token, key)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: 'Не авторизован!' })
    }
}}
