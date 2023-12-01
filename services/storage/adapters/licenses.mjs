const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 27017
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'topsecret'
const DB_NAME = process.env.DB_NAME || 'license'

import {MongoClient, ObjectId} from 'mongodb'

const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`
const client = new MongoClient(connectionString)

try {
    await client.connect()
    console.log('Dialogs connected to MongoDB cluster')
} catch (err) {
    console.error('error connecting: ' + err.stack)
}

const licenseDb = client.db(DB_NAME)
const dbLicenses = licenseDb.collection('licenses')

const create = async doc => {
    const res = await dbLicenses.insertOne({...doc, created_at: new Date()})
    return res.insertedId.toString()
}

const get = async id => {
    const res = await dbLicenses.findOne({_id: new ObjectId(id)})
    return res || null
}

export default {create, get}
