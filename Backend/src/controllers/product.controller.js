import db from '../config/db.js'
import AppError from '../utils/AppError.js'

export const fetchProductsByCatagories = (req, res, next) => {
    const { catagories } = req.query

    let sql = 'SELECT * FROM Products'
    const params = []

    if (catagories) {
      sql += ' WHERE catagories = ?'
      params.push(catagories)
    }

    db.all(sql, params, (error, rows) => {
      if (error) {
        return next(new AppError('Database Error', 500))
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

export const fetchProductById = (req, res, next) => {
  const { productID } = req.params
  if (!productID) {
    return next(new AppError('ProductID is Required', 400))
  }
  
  let sql = `SELECT * FROM Products WHERE productID = ?`

  db.get(sql, [productID], (error, row) => {
    if (error) {
      return next(new AppError('Database Error', 500))
    }

    if (!row) {
      return next(new AppError('Product Not Found', 404))
    }
    const data = {
      productID: row.productID,
      name: row.name,
      about: row.about,
      price: row.price,
      image: row.image ? row.image.toString("base64") : null,
      reviewScore: row.reviewScore
    }

    res.json(data)

  })
}




