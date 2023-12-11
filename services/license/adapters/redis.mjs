import Redis from 'ioredis'
const redis = new Redis()

const create = async doc => {
    return redis
        .multi()
        .set(`licenses:${doc.id}`, JSON.stringify(doc, null, 2))
        .sadd('licenses-outbox', `create:${doc.id}`)
        .exec()
}

export default {create}
