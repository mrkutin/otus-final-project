import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'otus-final-project',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
await producer.connect()

console.log()

const send = async doc => {
    await producer.send({
        topic: 'users',
        messages: [
            {
                key: doc.region,
                value: JSON.stringify({action: 'create', doc})
            }
        ]
    })
}

// Producing

export default {send}
