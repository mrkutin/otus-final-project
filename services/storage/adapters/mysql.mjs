import mysql from 'mysql2/promise'

const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    database: process.env.MYSQL_DATABASE || 'otus',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'topsecret'
}

const connection = await mysql.createConnection(config)

const create = async (table, entity) => {
    const statement = `INSERT INTO ${table} (id, password, first_name, second_name) VALUES('${user_id}', SHA2('${user.password}', 256), '${user.first_name || ''}', '${user.second_name || ''}');`
    await connection.execute(statement)
}

export default {create}
