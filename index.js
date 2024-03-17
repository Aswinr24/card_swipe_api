const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 5050

app.use(cors())
const responseObject = { message: 'hello' }

// Use __dirname instead of dirname
const dataFilePath = path.resolve(__dirname, 'data', 'data.json')

app.get('/', (req, res) => {
  res.json(responseObject)
})

app.get('/card/data', (req, res) => {
  if (fs.existsSync(dataFilePath)) {
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err)
        res.status(500).send('Internal Server Error')
      } else {
        try {
          const jsonData = JSON.parse(data)
          res.json(jsonData)
        } catch (jsonErr) {
          console.error('Error parsing JSON:', jsonErr)
          res.status(500).send('Internal Server Error')
        }
      }
    })
  } else {
    console.error('Data file not found')
    res.status(404).send('Data file not found')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
