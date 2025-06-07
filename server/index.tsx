import express from 'express'
import path from 'path'

const app = express()

app.use('/client', express.static(path.resolve(__dirname, '../dist/client')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
