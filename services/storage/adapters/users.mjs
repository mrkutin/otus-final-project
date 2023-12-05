const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 27017
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'topsecret'
const DB_NAME = process.env.DB_NAME || 'license'

import {MongoClient, ObjectId} from 'mongodb'
import crypto from 'crypto'
import {v4 as uuid} from 'uuid'

const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`
const client = new MongoClient(connectionString)

try {
    await client.connect()
    console.log('Users connected to MongoDB cluster')
} catch (err) {
    console.error('error connecting: ' + err.stack)
}

const licenseDb = client.db(DB_NAME)
const dbUsers = licenseDb.collection('users')

const authenticate = async (user_id, password) => {
    const token = uuid()
    const res = await dbUsers.findOneAndUpdate(
        {
            _id: new ObjectId(user_id),
            password: crypto.createHash('sha256').update(password, 'utf8').digest()
        },
        {
            $set: {token, updated_at: new Date()}
        })
    if (res) {
        return token
    }

    return null
}

const findByToken = token => dbUsers.findOne({token})

const create = async doc => {
    const res = await dbUsers.insertOne(
        {
            ...doc,
            password: doc.password ? crypto.createHash('sha256').update(doc.password, 'utf8').digest() : '',
            created_at: new Date()
        })

    return res.insertedId.toString()
}

const update = async doc => {
    const {_id, password, ...rest} = doc

    const set = {
        ...rest,
        updated_at: new Date()
    }

    if (password) {
        set.password = crypto.createHash('sha256').update(password, 'utf8').digest()
    }

    await dbUsers.updateOne(
        {_id: new ObjectId(_id)},
        {$set: set}
    )
}

const get = async filter => {
    if (filter._id && typeof filter._id === 'string') {
        filter._id = new ObjectId(filter._id)
    }
    const res = await dbUsers.findOne(filter)
    if (res) {
        delete res.password
    }
    return res
}

export default {authenticate, findByToken, create, update, get}
