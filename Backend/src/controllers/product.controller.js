import db from '../config/db.js'

export const fetchProductsByCatagories = (req, res) => {
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
}

//Post for admin
export const InsertProduct = (req, res) => {
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
}

export const DeleteProduct = (req, res) => {
  const { id } = req.query
  let sql = `DELETE FROM Products WHERE productID = ?`
  db.run(sql, id, (err) => {
    if (err) {
      console.error(err)
    }
  })
}
