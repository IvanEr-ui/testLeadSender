import 'dotenv/config'

const mySqlKnexConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        user: process.env.DB_LOGIN,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    }
}
export default mySqlKnexConfig
