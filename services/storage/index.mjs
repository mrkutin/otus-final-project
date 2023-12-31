import kafkaAdapter from './adapters/kafka.mjs'
import mysqlAdapter from './adapters/mysql.mjs'

const processor = async ({topic, partition, message}) => {
    const {action, entity} = JSON.parse(message.value.toString())

    if(entity.expires){
        entity.expires = entity.expires.replace('T', ' ').replace('Z', '')
    }

    switch (action) {
        case 'create':
            await mysqlAdapter.create(topic, entity)
            break
    }
}

await kafkaAdapter.run(processor)