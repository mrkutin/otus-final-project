const KAFKA_HOST = process.env.KAFKA_HOST || 'localhost'
const KAFKA_PORT = parseInt(process.env.KAFKA_PORT) || 9092

import {Kafka} from 'kafkajs'
const kafka = new Kafka({
    clientId: 'outbox',
    brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`]
})

const producer = kafka.producer()
await producer.connect()

const send = async (topic, action_entities) => {
    try{
        const messages = action_entities.map(action_entity => ({
            key: action_entity.entity.id.split('').pop(),
            value: JSON.stringify(action_entity)
        }))

        if(messages.length){
            await producer.send({
                topic,
                messages
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export default {send}
