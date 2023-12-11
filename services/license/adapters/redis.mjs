const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379

import Redis from 'ioredis'
const redis = new Redis(`redis://${REDIS_HOST}:${REDIS_PORT}`)

const create = async doc => {
    return redis
        .multi()
        .set(`licenses:${doc.id}`, JSON.stringify(doc, null, 2))
        .sadd('licenses-outbox', `create:${doc.id}`)
        .exec()
}

export default {create}
