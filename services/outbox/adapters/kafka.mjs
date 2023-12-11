import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'outbox',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
await producer.connect()

const send = async (topic, action_entities) => {
    const messages = action_entities.map(action_entity => ({
        key: action_entity.entity.id.split('').pop(),
        value: JSON.stringify(action_entity)
    }))

    await producer.send({
        topic,
        messages
    })
}

export default {send}
