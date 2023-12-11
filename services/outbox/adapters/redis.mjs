import Redis from 'ioredis'
const redis = new Redis()

const getPending = async entityName => {//users, licenses
    const ids = await redis.smembers(`${entityName}-outbox`)
    const entities = ids.map(id => redis.get(`users:${id}`))
    return Promise.all(entities)
}

export default {getPending}
