import { Request, Response } from 'express'
import Guitar from '../models/Guitar.model'

export const getGuitars = async (req: Request, res: Response) => {
    try {
        const guitars = await Guitar.findAll({
            order: [['price', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        res.json({ data: guitars })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener las guitarras' })
    }
}

export const getGuitarById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const guitar = await Guitar.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })

        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' })
        }

        res.json({ data: guitar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener la guitarra' })
    }
}

export const createGuitar = async (req: Request, res: Response) => {
    try {
        const guitar = await Guitar.create(req.body)
        res.status(201).json({ data: guitar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al crear la guitarra' })
    }
}

export const updateGuitar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const guitar = await Guitar.findByPk(id)

        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' })
        }

        await guitar.update(req.body)
        res.json({ data: guitar })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al actualizar la guitarra' })
    }
}

export const deleteGuitar = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const guitar = await Guitar.findByPk(id)

        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' })
        }

        await guitar.destroy()
        res.json({ data: 'Guitarra eliminada' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al eliminar la guitarra' })
    }
}