"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuitar = exports.updateGuitar = exports.createGuitar = exports.getGuitarById = exports.getGuitars = void 0;
const Guitar_model_1 = __importDefault(require("../models/Guitar.model"));
const getGuitars = async (req, res) => {
    try {
        const guitars = await Guitar_model_1.default.findAll({
            order: [['price', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.json({ data: guitars });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las guitarras' });
    }
};
exports.getGuitars = getGuitars;
const getGuitarById = async (req, res) => {
    try {
        const { id } = req.params;
        const guitar = await Guitar_model_1.default.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' });
        }
        res.json({ data: guitar });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la guitarra' });
    }
};
exports.getGuitarById = getGuitarById;
const createGuitar = async (req, res) => {
    try {
        const guitar = await Guitar_model_1.default.create(req.body);
        res.status(201).json({ data: guitar });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la guitarra' });
    }
};
exports.createGuitar = createGuitar;
const updateGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const guitar = await Guitar_model_1.default.findByPk(id);
        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' });
        }
        await guitar.update(req.body);
        res.json({ data: guitar });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la guitarra' });
    }
};
exports.updateGuitar = updateGuitar;
const deleteGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        const guitar = await Guitar_model_1.default.findByPk(id);
        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' });
        }
        await guitar.destroy();
        res.json({ data: 'Guitarra eliminada' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la guitarra' });
    }
};
exports.deleteGuitar = deleteGuitar;
