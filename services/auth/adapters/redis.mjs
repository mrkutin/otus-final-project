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

    if (doc.password) {
        doc.password = crypto.createHash('sha256').update(doc.password, 'utf8').digest().toString()
    }

    await redis
        .multi()
        .set(`users:${doc.id}`, JSON.stringify(doc, null, 2))
        .sadd('users-outbox', doc.id)
        .exec()

    return doc
}

const get = async name => {
    return redis.get(name)
}

export default {create, get}
