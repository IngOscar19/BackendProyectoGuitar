import { Request, Response } from 'express'
import Order from '../models/Order.model'

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.findAll({
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['updatedAt'] }
        })
        res.json({ data: orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener las órdenes' })
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const order = await Order.findByPk(id)

        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' })
        }

        res.json({ data: order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener la orden' })
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items, total } = req.body
        const order = await Order.create({ items, total, status: 'pending' })
        res.status(201).json({ data: order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear la orden' })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const order = await Order.findByPk(id)

        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' })
        }

        const { items, status } = req.body

        // Recalcular total si se actualizan los items
        const newTotal = items
            ? items.reduce(
                (acc: number, item: { price: number; quantity: number }) =>
                    acc + item.price * item.quantity,
                0
            )
            : order.total

        await order.update({
            items: items ?? order.items,
            total: newTotal,
            status: status ?? order.status,
        })

        res.json({ data: order })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al actualizar la orden' })
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const order = await Order.findByPk(id)

        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' })
        }

        await order.destroy()
        res.json({ data: 'Orden eliminada' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al eliminar la orden' })
    }
}