const TOPICS = ['users', 'licenses']

import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'otus-final-project',
    brokers: ['localhost:9092']
})

const admin = kafka.admin()
await admin.connect()
await admin.createTopics({
    topics: TOPICS.map(topic => ({ topic }))
})
await admin.disconnect()

const consumer = kafka.consumer({groupId: 'storage'})
await consumer.connect()
await consumer.subscribe({topics: TOPICS, fromBeginning: true})

const run = processor => {
    return consumer.run({
        eachMessage: processor
    })
}

export default {run}