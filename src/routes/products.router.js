const { Router } = require('express');
const { ProductMongo } = require('../daos/mongo/products.daoMongo');
const router = Router();

const products = new ProductMongo();

router.get('/', async (req, res) => {
  let { limit } = req.query;

  const getProducts = await products.getProducts();

  if (!limit || limit > getProducts.length) {
    res.status(200).json({
      status: 'ok',
      payload: getProducts,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: getProducts.slice(0, limit),
    });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;

  const getProducts = await products.getProductsById(pid);

  if (typeof (getProducts) === 'string') {
    res.status(404).json({
      status: 'fail',
      payload: getProducts, 
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: getProducts,
    });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;

  const resp = await products.addProduct(newProduct);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const changedProduct = req.body;

  const resp = await products.updateProduct(pid, changedProduct);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  const resp = await products.deleteProductById(pid);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

router.delete('/', async (req, res) => {
  const pcode = req.query.code;

  const resp = await products.deleteProductByCode(pcode);

  if (typeof(resp) === 'string') {
    res.status(400).json({
      status: 'fail',
      payload: resp,
    });
  } else {
    res.status(200).json({
      status: 'ok',
      payload: resp,
    });
  }
});

exports.productsRouter = router;
