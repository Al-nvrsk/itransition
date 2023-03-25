import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/model.js'
import { Op } from 'sequelize'
import path from 'path';
import * as dotenv from 'dotenv'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config()
dotenv.config({ path: path.join(__dirname,'..', '..', '..','..', '.env') });
export const key = process.env.SECRET_KEY


const generateGwt = (id, email, role,  firstName, secondName, createdAt, lastLoginAt) =>  {
    return jwt.sign(
        {id, email, role, firstName, secondName, createdAt, lastLoginAt},
        key,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration (req, res) {
        const {email, password, firstName, secondName, role} = req.body

        if(!email || !password || !firstName || !secondName){
            return res.json(ApiError.badRequest("Feild can't be empty!"))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return res.json(ApiError.internal('We have user with this email'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, firstName, secondName})
        const token = generateGwt(user.id, user.email, user.role, user.firstName, user.secondName)
        return res.json({token})
    }

    async login (req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Cant find user with this email'))
        }
        if(user.role === 'Blocked') {
            return next(ApiError.internal('User was blocked'))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Uncorrect password'))
        }
        user.update({ lastLoginAt: new Date() });
        const token = generateGwt(user.id, user.email, user.role, user.firstName, user.secondName)
        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateGwt(req.user.id)
        return res.json({token})
    }

    async getAll (req, res, next) {
        const allUsers = await User.findAll()
        return res.json(allUsers)
    }

    async changeAccess (req, res, next) {
        const users = req.body.selectedRows
        const usersId = users.map(user => user.id)
        
        await User.update(
            { role: users[0].role },
            { where: { id: { [Op.in]: usersId } } }
            );
        return res.json('ok')
    }

    async delete (req, res, next) {
        const users = req.body.selectedRows
        const usersId = users.map(user => user.id)
        await User.findAll({ where: { id:  usersId } })
        .then((selected) => {
            selected.forEach((user) => {
                user.destroy();
                });
            })
        return res.json('ok')
    }

}

export const userController = new UserController();
