import db from './config/db'
import app from './server'

const PORT = process.env.PORT || 4000

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
