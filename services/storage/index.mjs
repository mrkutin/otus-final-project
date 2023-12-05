import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'otus-final-project',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'storage' })

await consumer.connect()
await consumer.subscribe({ topic: 'users-topic', fromBeginning: true })

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
        })
    },
})