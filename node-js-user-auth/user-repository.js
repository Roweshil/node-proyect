import dbLocal from "db-local"
const {Schema} = new dbLocal({path: './db'})

const User = Schema('User', {
    _id: {type: String, required:true },
    username: {type: String, required:true},
    password: {type: String, required:true}
})

export class UserRepository {
    static create (username, password) {}
    static login (username, password) {}
}