import app from './app.js'

const PORT = 8000

app.listen(PORT, () => {
  try {
    console.log(`server is running at http://localhost:${PORT}`)
  } catch (error) {
    console.error(error)
  }
})


