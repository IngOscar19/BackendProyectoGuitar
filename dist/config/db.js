"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Guitar_model_1 = __importDefault(require("../models/Guitar.model"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
dotenv_1.default.config();
const db = new sequelize_typescript_1.Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false,
    models: [Guitar_model_1.default, Order_model_1.default],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.default = db;
