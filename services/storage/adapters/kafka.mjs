import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'otus-final-project',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'storage' })

await consumer.connect()
await consumer.subscribe({ topic: 'users-topic', fromBeginning: true })

const run = processor => {
    return consumer.run({
        eachMessage: processor
    })
}

export default {run}