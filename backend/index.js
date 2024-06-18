// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const products = [
  { id: 1, name: 'Watch', description: 'A nice wrist watch' },
  { id: 2, name: 'Phone', description: 'A smart phone' },
  // Add more products as needed
];

app.get('/products', (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  res.json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
