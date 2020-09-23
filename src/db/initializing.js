import knex from 'knex'
import dotENV from '../utils/setENV'

dotENV.config()

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    pool: {
      min: process.env.DB_MIN_CONNECTION,
      max: process.env.DB_MAX_CONNECTION,
    },
  },
})

export default db
