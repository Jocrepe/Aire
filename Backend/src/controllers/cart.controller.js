import db from '../config/db.js'
import AppError from '../utils/AppError.js'


export const AddToCart = (req, res, next) => {
  const userID = req.user.userID
  const { productID, quantity } = req.body

  if (!productID || !quantity) {
    return next(new AppError('Invalid ProductID or quantity', 400))
  }

  db.get(`SELECT * FROM Cart WHERE userID = ? AND productID = ?`,
    [userID, productID],
    (err, row) => {
      if (err) {
        return next(new AppError('Database Error', 500))
      }
      if (row) {
        db.run(`UPDATE Cart SET quantity = ? WHERE userID = ? AND productID = ?`,
          [quantity, userID, productID],
          () => res.json({ message: "Quantity Updated" })
        )
      } else {
        db.run(`INSERT INTO Cart (userID, productID, quantity) VALUES (?, ?, ?)`,
          [userID, productID, quantity],
          () => res.json({ message: "Added to Cart" })
        )
      }
    })
}

//fetch cart
export const fetchCart = (req, res, next) => {
  const userID = req.user.userID

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
        return next(new AppError('Database Error', 500))
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
}

export const deleteItemFromCart = (req, res, next) => {
  const userID = req.user.userID
  const { productID } = req.params

  if (!productID) {
    return next(new AppError('productID is required', 400))
  }

  let sql = `DELETE FROM Cart WHERE userID = ? AND productID = ?`
  db.run(sql, 
    [userID, productID], 
    (error) => {
      if (error) {
        return next(new AppError('Database Error', 500))
      }

      res.json({
        message: 'Item removed from cart',
        productID
      })
    })
}
