import express from 'express'
import { login, logout, fetchAuth, register } from '../controllers/auth.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)
router.get('/fetchAuth', auth, fetchAuth)

export default router