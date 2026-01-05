import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import cartRoutes from './routes/cart.routes.js'
import productRoutes from './routes/product.routes.js'

import adminProductRoutes from './routes/admin/adminProduct.routes.js'

import errorHandler from './middlewares/error.middleware.js'


const app = express()
app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

//admin
app.use('/api/admin/products', adminProductRoutes)

app.use(errorHandler)

export default app
