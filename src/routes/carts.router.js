const { Router } = require('express');
const { CartMongo } = require('../daos/mongo/cart.daoMongo');

const router = Router();
const cart = new CartMongo();

router.get('/:cid', async (req, res) => {
  try {
    const id = req.params.cid;
    const resp = await cart.getCarts(id);

    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await cart.create();

    res.status(200).json({
      status: 'ok',
      payload: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error.message,
    });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;

    const resp = await cart.updateCart(cid, products);

    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error.message,
    });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const resp = await cart.updateProductQuantity(cid, pid, quantity);

    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error.message,
    });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;

    const resp = await cart.removeAllProducts(cid);

    res.status(200).json({
      status: 'ok',
      data: resp,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: error.message,
    });
  }
});

exports.cartsRouter = router;