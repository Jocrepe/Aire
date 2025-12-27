import express from 'express'
import { fetchProductsByCatagories, InsertProduct, DeleteProduct } from '../controllers/product.controller.js'
import upload from '../middlewares/product.middleware.js'

const router = express.Router()

router.get('/', fetchProductsByCatagories)
router.post('/', upload.single('image'), InsertProduct)
router.delete('/:id', DeleteProduct)

export default router