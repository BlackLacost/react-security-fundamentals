import express from 'express'

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.json({ message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`)
})
