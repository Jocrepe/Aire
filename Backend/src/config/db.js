import sqlite from 'sqlite3'

const db = new sqlite.Database('./Productdb.sqlite',(error) => {
  if (error) console.log("DB Error: ", error)
  else console.log('----------DB connected----------.')
})

export default db