import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'

const PORT = process.env.PORT || 10000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
