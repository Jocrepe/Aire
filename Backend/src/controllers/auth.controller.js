import jwt from 'jsonwebtoken'
import db from '../config/db.js'
import bcrypt from 'bcrypt'

const JWT_SECRET_KEY = 'Aire-secret-key'

//register
export const register = async (req, res) => {
  try {
    const {email, password, name} = req.body
    if (!email || !password || !name) {
        return res.status(400).json({message: 'email password name required'})
    }
    const passwordHash = await bcrypt.hash(password, 10)
    let sql = `INSERT INTO Users (email, passwordHash, name) VALUES (?, ?, ?)`
    db.run(sql,
      [email, passwordHash, name],
      (error) => {
        if (error) {
          console.error(error)
          return res.status(500).json({ message: "Insert failed", error: error });
        }
        res.json({message: 'INSERT COMPLETE',
          email,
          name
        })
      }
    )
  } catch (error) {
    console.error(error)
    res.json({message: 'INSERT ERROR',
      error
    }
    )
  }
}



export const login = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({message: 'email and password required'})
    }
    let sql = `SELECT * FROM Users WHERE email = ?`
    db.get(sql,
      [email],
      async (error, userData) => {
        if (error) {
          console.error(error)
          return res.status(500).json({ message: "Insert failed", error: error });
        } 

        if (!userData) {
          return res.status(401).json({message: 'Invalid email or password'})
        }

        const match = await bcrypt.compare(password, userData.passwordHash)
        if (!match) {
          res.status(401).json({message: 'Invalid email or password'})
          return false
        }

        const ONE_HOUR = 60 * 60 * 1000
        const token = jwt.sign({email, userID: userData.userID}, JWT_SECRET_KEY, {expiresIn: '1h'})
        res.cookie('token', token, {
          maxAge: ONE_HOUR,
          secure: false,
          httpOnly: true,
          sameSite: "lax"
        })

        res.json({message: 'Login success',
          userID: userData.userID,
          email: userData.email,
          name: userData.name,
        })
        console.log('User log in')

      }
    )
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
