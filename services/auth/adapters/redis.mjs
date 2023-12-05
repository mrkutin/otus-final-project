import Redis from 'ioredis'
import crypto from 'crypto'
import {v4 as uuid} from 'uuid'

const redis = new Redis()

// const authenticate = async (user_id, password) => {
//     const token = uuid()
//     const res = await dbUsers.findOneAndUpdate(
//         {
//             _id: new ObjectId(user_id),
//             password: crypto.createHash('sha256').update(password, 'utf8').digest()
//         },
//         {
//             $set: {token, updated_at: new Date()}
//         })
//     if (res) {
//         return token
//     }
//
//     return null
// }

// const findByToken = token => dbUsers.findOne({token})

const create = async doc => {
    doc.id = uuid()

    if(doc.password){
        doc.password = crypto.createHash('sha256').update(doc.password, 'utf8').digest().toString()
    }

    await redis.set(doc.name, JSON.stringify(doc, null, 2))

    return doc
}

const get = async name => {
    const res = await redis.get(name)
    return res
}

export default {create, get}
