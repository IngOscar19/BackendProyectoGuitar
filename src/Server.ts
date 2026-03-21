import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db'
import guitarRoutes from './routes/guitarRoutes'
import orderRoutes from './routes/orderRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.use(express.json())

//Rutas
app.use('/api/guitars', guitarRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (_req, res) => {
    res.json({ message: 'API GuitarLA funcionando correctamente' })
})

const startServer = async () => {
    try {
        await db.authenticate()
        console.log('Conexión a PostgreSQL establecida')

        await db.sync()
        console.log('Tablas sincronizadas')

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('No se pudo conectar a la BD:', error)
        process.exit(1)
    }
}

startServer()