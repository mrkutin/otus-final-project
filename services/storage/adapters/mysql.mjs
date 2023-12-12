import mysql from 'mysql2/promise'

const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'otus',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'topsecret'
}

const connection = await mysql.createConnection(config)

const create = async (table, entity) => {
    const keys = Object.keys(entity)
    const values = Object.values(entity)
    const statement = `INSERT INTO ${table} (${keys.join(', ')}) VALUES(${values.map(value => `"${value}"`).join(', ')});`
    console.log('STATEMENT: ', statement)
    await connection.execute(statement)
}

export default {create}
