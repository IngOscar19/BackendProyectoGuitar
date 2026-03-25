import { Router } from 'express'
import { body, param } from 'express-validator'
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../handlers/orderController'
import { handleInputErrors } from '../middleware/handleInputErrors';

const router = Router()

router.get('/', getOrders)

router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getOrderById
)

router.post('/',
    body('items')
        .isArray({ min: 1 }).withMessage('La orden debe tener al menos un item'),
    body('items.*.id')
        .isInt().withMessage('El ID de cada item debe ser un número'),
    body('items.*.quantity')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),
    body('items.*.price')
        .isFloat({ min: 1 }).withMessage('El precio debe ser mayor a 0'),
    body('total')
        .isFloat({ min: 1 }).withMessage('El total debe ser mayor a 0'),
    handleInputErrors,
    createOrder
)

router.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('items')
        .optional()
        .isArray({ min: 1 }).withMessage('La orden debe tener al menos un item'),
    body('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled']).withMessage('Status no válido'),
    handleInputErrors,
    updateOrder
)

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteOrder
)

export default router