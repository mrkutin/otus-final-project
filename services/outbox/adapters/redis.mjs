import Redis from 'ioredis'
const redis = new Redis()

const getPending = async entityName => {
    const action_ids = await redis.smembers(`${entityName}-outbox`)
    const entities = action_ids.map(async action_ids => {
        const [action, id] = action_ids.split(':')
        const entity = JSON.parse(await redis.get(`${entityName}:${id}`))
        delete entity.password
        return {action, entity}
    })
    return Promise.all(entities)
}

const cleanPending = async (entityName, ids) => {
    if(!ids.length){
        return Promise.resolve()
    }
    return redis.srem(`${entityName}-outbox`, ids)
}

export default {getPending, cleanPending}
