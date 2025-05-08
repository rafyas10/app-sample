const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

const db = mysql.createConnection({
  host: 'database-1.cknq48ycor27.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '10012002asus',
  database: 'ecommerce'
});

db.connect((err) => {
  if (err) return console.error('Connection error:', err.stack);
  console.log('Connected to database.');
});

app.get('/products', (req, res) => {
  db.query('SELECT name, price, image_url FROM products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Query error' });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
