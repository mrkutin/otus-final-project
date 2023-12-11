import Redis from 'ioredis'
const redis = new Redis()

const getPending = async entityName => {
    const action_ids = await redis.smembers(`${entityName}-outbox`)
    const entities = action_ids.map(async action_ids => {
        const [action, id] = action_ids.split(':')
        const entity = JSON.parse(await redis.get(`users:${id}`))
        delete entity.password
        return {action, entity}
    })
    return Promise.all(entities)
}

export default {getPending}
