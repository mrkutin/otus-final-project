const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379

import Redis from 'ioredis'
const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`)

const create = async doc => {
    return redis
        .multi()
        .set(`licenses:${doc.id}`, JSON.stringify(doc, null, 2))//license itself
        .sadd(`licenses-by-user:${doc.user_id}`, doc.id)//license to licenses by user
        .sadd('licenses-outbox', `create:${doc.id}`)//license to outbox
        .exec()
}
const findByUserId = async user_id => {
    const ids = await redis.smembers(`licenses-by-user:${user_id}`)
    return Promise.all(ids.map(id => redis.get(`licenses:${id}`).then(license => JSON.parse(license))))
}

export default {create, findByUserId}
