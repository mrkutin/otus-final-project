const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379

import Redis from 'ioredis'
const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`)

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
    return redis
        .multi()
        .set(`users:${doc.id}`, JSON.stringify(doc, null, 2))
        .sadd('users-outbox', `create:${doc.id}`)
        .exec()
}

// const get = async name => {
//     return redis.get(name)
// }

export default {create}
