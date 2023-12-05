import kafka from './adapters/kafka.mjs'

const processor = async ({topic, partition, message}) => {
    console.log({
        topic,
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString()
    })
}

await kafka.run(processor)