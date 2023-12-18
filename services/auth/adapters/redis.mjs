const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379

import {createHash} from 'node:crypto'
import {v4 as uuid} from 'uuid'

import Redis from 'ioredis'
const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`)

const createToken = async (user_id, password) => {
    const user = JSON.parse(await redis.get(`users:${user_id}`))

    if (!user){
        return null
    }

    if(user.password !== createHash('sha256').update(password, 'utf8').digest('hex')){
        return null
    }

    const token = uuid()
    await redis.set(`tokens:${token}`, user_id)

    return token
}

const findByToken = async token => {
    const user_id = await redis.get(`tokens:${token}`)
    const user_str = await redis.get(`users:${user_id}`)
    if(!user_str){
        return null
    }
    const user = JSON.parse(user_str)
    delete user.password
    return user
}

const create = async doc => {
    if(!doc.id){
        doc.id = uuid()
    }

    if (doc.password) {
        doc.password = createHash('sha256').update(doc.password, 'utf8').digest('hex')
    }

    return redis
        .multi()
        .set(`users:${doc.id}`, JSON.stringify(doc, null, 2))
        .sadd('users-outbox', `create:${doc.id}`)
        .exec()
}

export default {create, createToken, findByToken}
