const ENTITY_NAMES = ['users', 'licenses']

import kafkaAdapter from './adapters/kafka.mjs'
import redisAdapter from './adapters/redis.mjs'

while (true) {
    for (const entityName of ENTITY_NAMES) {
        try{
            //read pending
            const pendingEntities = await redisAdapter.getPending(entityName)

            //send to kafka
            if(pendingEntities.length){
                await kafkaAdapter.send(entityName, pendingEntities)
            }

            //clean pending
            const ids = pendingEntities.map(({action, entity}) => {
                return `${action}:${entity.id}`
            })
            if(ids.length){
                await redisAdapter.cleanPending(entityName, ids)
                console.log('Sent to Kafka: ', JSON.stringify(ids))
            }
        } catch (e) {
            console.log(e)
        }
    }
    await new Promise(resolve => {
        setTimeout(resolve, 5000)
    })
}