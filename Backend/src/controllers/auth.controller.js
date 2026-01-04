import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'
import db from '../config/db.js'
import bcrypt from 'bcrypt'
import AppError from '../utils/AppError.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//register
export const register = async (req, res, next) => {
  try {
    const {email, password, name} = req.body

    if (!email || !password || !name) {
        return next(new AppError('Email, password, username are required', 400))
    }

    const passwordHash = await bcrypt.hash(password, 10)

    let sql = `INSERT INTO Users (email, passwordHash, name) VALUES (?, ?, ?)`

    db.run(sql,
      [email, passwordHash, name],
      (error) => {
        if (error) {
          // email ซ้ำ (unique)
          if (error.code === 'SQLITE_CONSTRAINT') {
            return next(new AppError('Email already exists', 409))
          }
          return next(new AppError('Database Error', 500))
        }

        res.json({message: 'INSERT COMPLETE',
          email,
          name
        })
      }
    )
  } catch (error) {
    next(error)
  }
}



export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
      return next(new AppError('Email and Password are required', 400))
    }

    let sql = `SELECT * FROM Users WHERE email = ?`

    db.get(sql,
      [email],
      async (error, userData) => {
        if (error) {
          return next(new AppError('Database Error', 500))
        } 

        if (!userData) {
          return next(new AppError('Invalid email or password', 401))
        }

        const match = await bcrypt.compare(password, userData.passwordHash)
        if (!match) {
          return next(new AppError('Invalid email or password', 401)) 
        }

        const ONE_HOUR = 60 * 60 * 1000
        const token = jwt.sign({email, userID: userData.userID, role: userData.role}, JWT_SECRET_KEY, {expiresIn: '1h'})
        res.cookie('token', token, {
          maxAge: ONE_HOUR,
          secure: false,
          httpOnly: true,
          sameSite: "lax"
        })

        res.json({message: 'Login success',
          name: userData.name
        })

      }
    )
  } catch (error) {
    next(error)
  }
}

export const fetchAuth = (req, res) => {
  res.json({
    userID: req.user.userID,
    email: req.user.email
  })
}

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })
  res.json({ message: 'Logged out' })
  console.log('User log out')
}
