import sqlite from 'sqlite3'
import express from 'express'
import fs from 'fs'

const app = express()

const db = new sqlite.Database('./Productdb.sqlite')

const imagePath = 'C:/Users/Crepe/OneDrive/เดสก์ท็อป/cathub/cathub/backend/Database(sqlite)/test.png'
const imageBuffer = fs.readFileSync(imagePath)

app.use(express.json())

app.patch('/t1', (req, res) => {
  db.run(`UPDATE Products SET image = ? WHERE productID = 5`,[imageBuffer])
  res.json({message: 'Uploaded'})
  console.log('Uploaded!')
})

app.listen(1000, () => {
  console.log('server is running at http://localhost:1000')
})
