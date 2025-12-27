import sqlite from 'sqlite3'
import multer from 'multer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = 'Aire-secret-key'


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg']
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Invalid file type'), false)
  }
})


const db = new sqlite.Database('./Productdb.sqlite',(error) => {
  if (error) console.log("DB Error: ", error)
  else console.log('===DB connected===.')
})

//middle ware




// ===Cart=====================================================================

//Add To Cart (post)
app.post('/cart', auth, (req, res) => {
  const userID = req.user.userID
  const { productID } = req.body

  db.get(`SELECT * FROM Cart WHERE userID = ? AND productID = ?`,
    [userID, productID],
    (err, row) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: 'DB ERROR' })
    }
      if (row) {
        db.run(`UPDATE Cart SET quantity = quantity + 1 WHERE userID = ? AND productID = ?`,
          [userID, productID],
          () => res.json({ message: "Quantity Updated" })
        )
      } else {
        db.run(`INSERT INTO Cart (userID, productID, quantity) VALUES (?, ?, 1)`,
          [userID, productID],
          () => res.json({ message: "Added to Cart" })
        )
      }
    })
})

//fetch cart
app.get('/cart', auth, (req, res) => {
  const userID = req.user.userID
  if (!userID) return res.status(400).json({message: 'userID required'})

  let sql = `
    SELECT
      Cart.productID,
      Cart.quantity,
      Products.name,
      Products.price,
      Products.image
    FROM Cart
    JOIN Products
      ON Cart.productID = Products.productID
    WHERE Cart.userID = ?
  `
  db.all(sql,
    [userID],
    (error, rows) => {
      if (error) {
        console.error("SQL ERROR:", error)
        return res.status(500).json({ message: 'DB Error: ', error: error })
      }

      const data = rows.map(row => ({
        productID: row.productID,
        name: row.name,
        price: row.price,
        image: row.image ? row.image.toString("base64") : null,
        quantity: row.quantity
      }))

      res.json(data)
    })
})

app.delete('/cart', auth, (req, res) => {
  const userID = req.user.userID
  const { productID } = req.body

  if (!productID || !userID) {
    return res.status(400).json({ message: 'productID, userID is required!' })
  }

  let sql = `DELETE FROM Cart WHERE userID = ? AND productID = ?`
  db.run(sql, 
    [userID, productID], 
    (error) => {
      if (error) {
        console.error("SQL ERROR:", error)
        return res.status(500).json({ message: 'DB Error: ', error: error })
      }

      res.json({
        message: 'Item removed from cart',
        productID
      })
    })
})
// ============================================================================






// get product by catagory
app.get('/Products', (req, res) => {
  const { catagories } = req.query

  let sql = 'SELECT * FROM Products'
  const params = []

  if (catagories) {
    sql += ' WHERE catagories = ?'
    params.push(catagories)
  }

  db.all(sql, params, (error, rows) => {
    if (error) {
      console.error("SQL ERROR:", error)
      return res.status(500).json({ message: 'DB Error: ', error: error })
    }

    const data = rows.map(row => ({
      productID: row.productID,
      name: row.name,
      about: row.about,
      price: row.price,
      image: row.image ? row.image.toString("base64") : null,
      reviewScore: row.reviewScore
    }))

    res.json(data)
  })
})




//Post for admin

app.post('/admin', upload.single('image'), (req, res) => {
  const {name, about, price, reviewScore, catagories} = req.body
  const imageBuffer = req.file.buffer

  let sql = `INSERT INTO Products(name, about, price, image, reviewScore, catagories)
  VALUES (?, ?, ?, ?, ?, ?)`

  db.run(sql,
  [name, about, price, imageBuffer, reviewScore, catagories],
   (error) => {
    if (error) {
      console.error(error)
      return res.status(500).json({ message: "Insert failed", error: error });
    }

  console.log('Insert complete ID : ')
  res.json({message: 'Insert complete'})

  }
  )
})

app.delete('/admin', (req, res) => {
  const {productID} = req.query
  let sql = `DELETE FROM Products WHERE productID = ?`
  db.run(sql, productID, (err) => {
    if (err) {
      console.error(err)
    }
  })
})

//======login system============

//register
app.post('/api/register', async (req, res) => {
  try {
    const {email, password, name} = req.body
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
})

//login
app.post('/api/login', async (req, res) => {
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
})

app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
  res.json({ message: 'Logged out' })
  console.log('User log out')
})


app.get('/api/fetchAuth', auth, (req, res) => {
  res.json({
    userID: req.user.userID,
    email: req.user.email
  })
})


//======================
