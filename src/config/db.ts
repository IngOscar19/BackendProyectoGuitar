import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import Guitar from '../models/Guitar.model'
import Order from '../models/Order.model'

dotenv.config()

const db = new Sequelize(process.env.DB_URL as string, {
    dialect: 'postgres',
    logging: false,
    models: [Guitar, Order], 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

export default db