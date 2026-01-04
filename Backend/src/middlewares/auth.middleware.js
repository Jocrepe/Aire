import AppError from '../utils/AppError.js'

import jwt from 'jsonwebtoken'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export default function auth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return next(new AppError('Not Authenticated', 401))
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return next(new AppError('Invild token', 401))
  }
  console.log('cookie: ', req.user)
}