"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const orderController_1 = require("../handlers/orderController");
const handleInputErrors_1 = require("../middleware/handleInputErrors");
const router = (0, express_1.Router)();
router.get('/', orderController_1.getOrders);
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), handleInputErrors_1.handleInputErrors, orderController_1.getOrderById);
router.post('/', (0, express_validator_1.body)('items')
    .isArray({ min: 1 }).withMessage('La orden debe tener al menos un item'), (0, express_validator_1.body)('items.*.id')
    .isInt().withMessage('El ID de cada item debe ser un número'), (0, express_validator_1.body)('items.*.quantity')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'), (0, express_validator_1.body)('items.*.price')
    .isFloat({ min: 1 }).withMessage('El precio debe ser mayor a 0'), (0, express_validator_1.body)('total')
    .isFloat({ min: 1 }).withMessage('El total debe ser mayor a 0'), handleInputErrors_1.handleInputErrors, orderController_1.createOrder);
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), (0, express_validator_1.body)('items')
    .optional()
    .isArray({ min: 1 }).withMessage('La orden debe tener al menos un item'), (0, express_validator_1.body)('status')
    .optional()
    .isIn(['pending', 'completed', 'cancelled']).withMessage('Status no válido'), handleInputErrors_1.handleInputErrors, orderController_1.updateOrder);
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no válido'), handleInputErrors_1.handleInputErrors, orderController_1.deleteOrder);
exports.default = router;
