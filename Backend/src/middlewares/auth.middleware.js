import jwt from 'jsonwebtoken'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export default function auth(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  console.log('cookie: ', req.user)
}