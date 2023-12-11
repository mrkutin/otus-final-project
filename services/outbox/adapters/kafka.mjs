import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'otus-final-project',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()
await producer.connect()

const send = async (topic, doc) => {
    await producer.send({
        topic,
        messages: [
            {
                key: doc.region,
                value: JSON.stringify({action: 'create', doc})
            }
        ]
    })
}

export default {send}
