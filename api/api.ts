import express, { Request, Response } from 'express';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  });

interface DataObject {
  title: string;
  description: string;
  primary_color: string;
  secondary_color: string;
}

const dataFilePath = path.resolve(__dirname, './data', 'data.json');


app.get('/card/data', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  res.json(data);

});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
