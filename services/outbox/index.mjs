const ENTITY_NAMES = ['users', 'licenses']

import kafkaAdapter from './adapters/kafka.mjs'
import redisAdapter from './adapters/redis.mjs'

while (true) {
    for (const entityName of ENTITY_NAMES) {
        const pendingEntities = await redisAdapter.getPending(entityName)
        await kafkaAdapter.send(entityName, pendingEntities)
    }
    await new Promise(resolve => {
        setTimeout(resolve, 5000)
    })
}