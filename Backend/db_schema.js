import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./Productdb.sqlite')

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Products (
    productID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    about TEXT,
    price TEXT,
    image BLOB,
    reviewScore TEXT,
    catagories TEXT
    )`)

  db.run(`CREATE TABLE IF NOT EXISTS Cart (
    cartID INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER,
    productID INTEGER,
    quantity INTEGER
    )`)

  db.run(`CREATE TABLE IF NOT EXISTS Users (
  userID INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

})

export default db;
