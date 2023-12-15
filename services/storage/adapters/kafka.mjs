const TOPICS = ['users', 'licenses']

const KAFKA_HOST = process.env.KAFKA_HOST || 'localhost'
const KAFKA_PORT = parseInt(process.env.KAFKA_PORT) || 9092

import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: process.pid,
    brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`]
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