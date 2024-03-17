const express = require('express')
const fs = require('fs')
const path = require('path')
const { fileURLToPath } = require('url')
const { dirname } = require('path')

const app = express()
const PORT = 5050

app.use(cors())

const dataFilePath = path.resolve(__dirname, './data', 'data.json')

app.get('/', (req, res) => {
  console.log('hello')
})

app.get('/card/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
