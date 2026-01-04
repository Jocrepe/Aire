import express from 'express'
import { fetchAllProducts, InsertProduct, DeleteProduct, fetchProductById, UpdateProduct } from '../../controllers/admin/adminProduct.controller.js'
import upload from '../../middlewares/product.middleware.js'
import auth from '../../middlewares/auth.middleware.js'
import isAdmin from '../../middlewares/admin.middleware.js'

const router = express.Router()

router.get('/', auth, isAdmin, fetchAllProducts)
router.post('/', auth, isAdmin, upload.single('image'), InsertProduct)
router.delete('/:productID', auth, isAdmin, DeleteProduct)
router.get('/:productID', auth, isAdmin, fetchProductById)
router.put('/', auth, isAdmin, upload.single('image'), UpdateProduct)

export default router