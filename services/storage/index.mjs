import kafkaAdapter from './adapters/kafka.mjs'
import mysqlAdapter from './adapters/mysql.mjs'

const processor = async ({topic, partition, message}) => {
    console.log({
        topic,
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString()
    })
}

await kafkaAdapter.run(processor)