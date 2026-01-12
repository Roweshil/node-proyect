import dbLocal from "db-local"
import z from "zod"
import crypto from "node:crypto"
import bcrypt from "bcrypt"
import { SALT_ROUNDS } from "./config.js"

const {Schema} = new dbLocal({path: './db'})

const User = Schema('User', {
    _id: {type: String, required:true },
    username: {type: String, required:true},
    password: {type: String, required:true}
})

export class UserRepository {
    static create (username, password) {
        //1. Validaciones
        if(typeof username !== 'string') throw new TypeError('Username must be a string')
        if(username.length < 3) throw new Error('Username must be at least 3 characters long')

        if(typeof password !== 'string') throw new TypeError('Password must be a string')
        if(password.length < 6) throw new Error('Password must be at least 6 characters long')
    

        //2. ASEGURAR QUE EL USUARIO NO EXISTE
        const user =User.findOne({username})
        if(user) throw new Error('Username already exists')

        //3. CREAR EL id
        const id = crypto.randomUUID()

        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

        User.create({
            _id: id, 
            username, 
            password
        }).save()

        console.log({id})

        return id
    }

    static login (username, password) {}
}