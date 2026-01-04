import db from '../../config/db.js'
import AppError from '../../utils/AppError.js'

export const fetchAllProducts = (req, res, next) => {
  let sql = 'SELECT * FROM Products'
  db.all(sql, (error, rows) => {
    if (error) {
      return next(new AppError('Database Error', 500))
    }
    
    const data = rows.map(row => ({
        productID: row.productID,
        name: row.name,
        about: row.about,
        price: row.price,
        image: row.image ? row.image.toString("base64") : null,
        reviewScore: row.reviewScore,
        catagories: row.catagories
      }))

      res.json(data)
  })
}

export const InsertProduct = (req, res, next) => {
  const {name, about, price, reviewScore, catagories} = req.body
  if (!req.file) {
  return next(new AppError('Image is required', 400))
  }

  const imageBuffer = req.file.buffer


  let sql = `INSERT INTO Products(name, about, price, image, reviewScore, catagories)
  VALUES (?, ?, ?, ?, ?, ?)`

  db.run(sql,
  [name, about, price, imageBuffer, reviewScore, catagories],
   (error) => {
    if (error) {
      return next(new AppError('Database Error', 500))
    }

  res.json({message: 'Insert complete'})

  })

}

export const DeleteProduct = (req, res, next) => {
  const { productID } = req.params

  db.run(
    `DELETE FROM Products WHERE productID = ?`,
    [productID],
    function (err) {
      if (err) {
        return next(new AppError('Database Error', 500))
      }

      if (this.changes === 0) {
        return next(new AppError('Product not found', 404))
      }

      res.json({ message: 'Product deleted successfully' })
    }
  )
}
