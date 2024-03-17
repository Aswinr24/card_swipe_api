const express = require('express');
const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const app = express();
const PORT = 5050;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  next();
});

const dataFilePath = path.resolve(__dirname, './data', 'data.json');

app.get('/card/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
