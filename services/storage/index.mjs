import kafka from './adapters/kafka.mjs'

const processor = async ({topic, partition, message}) => {
    console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
    })
}

await kafka.run(processor)