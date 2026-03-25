"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
const Order_model_1 = __importDefault(require("../models/Order.model"));
const getOrders = async (req, res) => {
    try {
        const orders = await Order_model_1.default.findAll({
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['updatedAt'] }
        });
        res.json({ data: orders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};
exports.getOrders = getOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_model_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.json({ data: order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la orden' });
    }
};
exports.getOrderById = getOrderById;
const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const order = await Order_model_1.default.create({ items, total, status: 'pending' });
        res.status(201).json({ data: order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_model_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        const { items, status } = req.body;
        // Recalcular total si se actualizan los items
        const newTotal = items
            ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : order.total;
        await order.update({
            items: items ?? order.items,
            total: newTotal,
            status: status ?? order.status,
        });
        res.json({ data: order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la orden' });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_model_1.default.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        await order.destroy();
        res.json({ data: 'Orden eliminada' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la orden' });
    }
};
exports.deleteOrder = deleteOrder;
