import { Client } from 'pg'

const createDatabaseConnection = () => {
  const client = new Client({
    user: process.env.DATABASE_USERNAME,
    host: 'localhost',
    database: 'hq_test',
    password: 'postgres',
    port: 5432,
  })

  async function connect(): Promise<void> {
    try {
      await client.connect()
      console.log('Connected to PostgreSQL database')
    } catch (err) {
      console.error('Error connecting to PostgreSQL database:', err)
    }
  }

  async function disconnect(): Promise<void> {
    try {
      await client.end()
      console.log('Connection to PostgreSQL database closed')
    } catch (err) {
      console.error('Error closing connection:', err)
    }
  }

  function getClient(): Client {
    return client
  }

  return {
    connect,
    disconnect,
    getClient,
  }
}

const databaseConnection = createDatabaseConnection()

const instantiateDB = async () => {
  const db = databaseConnection
  await db.connect()
  const client = db.getClient()
  return client
}

export default instantiateDB
