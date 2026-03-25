"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const guitarRoutes_1 = __importDefault(require("./routes/guitarRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json());
//Rutas
app.use('/api/guitars', guitarRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.get('/', (_req, res) => {
    res.json({ message: 'API GuitarLA funcionando correctamente' });
});
const startServer = async () => {
    try {
        await db_1.default.authenticate();
        console.log('Conexión a PostgreSQL establecida');
        await db_1.default.sync();
        console.log('Tablas sincronizadas');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('No se pudo conectar a la BD:', error);
        process.exit(1);
    }
};
startServer();
