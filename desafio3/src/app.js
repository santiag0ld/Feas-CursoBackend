const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = 8000;
const productManager = new ProductManager('../products.json');


app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const products = await productManager.getProducts();

    if (!isNaN(limit)) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(productId);

    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
