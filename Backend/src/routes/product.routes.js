import express from 'express'
import { fetchProductsByCatagories, InsertProduct, DeleteProduct, fetchProductById } from '../controllers/product.controller.js'
import upload from '../middlewares/product.middleware.js'

const router = express.Router()

router.get('/', fetchProductsByCatagories)
router.get('/:productID', fetchProductById)
router.post('/', upload.single('image'), InsertProduct)
router.delete('/:id', DeleteProduct)

export default router