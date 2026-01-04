import express from 'express'
import { fetchProductsByCatagories, fetchProductById } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', fetchProductsByCatagories)
router.get('/:productID', fetchProductById)

export default router