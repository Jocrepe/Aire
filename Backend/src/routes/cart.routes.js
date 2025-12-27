import express from 'express'
import { AddToCart, fetchCart, deleteItemFromCart } from '../controllers/cart.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', auth, AddToCart)
router.get('/', auth, fetchCart)
router.delete('/:productID', auth, deleteItemFromCart)

export default router