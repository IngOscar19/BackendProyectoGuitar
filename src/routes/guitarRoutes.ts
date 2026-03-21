import { Router } from 'express'
import { body, param } from 'express-validator'
import { getGuitars, getGuitarById, createGuitar, updateGuitar, deleteGuitar } from '../handlers/guitarController'
import { handleInputErrors } from '../middleware/HandleInputErrors'

const router = Router()

router.get('/', getGuitars)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getGuitarById
)

router.post('/',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('image').notEmpty().withMessage('La imagen es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 1 }).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    createGuitar
)

router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('image').notEmpty().withMessage('La imagen es obligatoria'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isFloat({ min: 1 }).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    updateGuitar
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteGuitar
)

export default router