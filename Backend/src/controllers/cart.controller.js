import db from '../config/db.js'


export const AddToCart = (req, res) => {
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
}

//fetch cart
export const fetchCart = (req, res) => {
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
}

export const deleteItemFromCart = (req, res) => {
  const userID = req.user.userID
  const { productID } = req.params

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
}
