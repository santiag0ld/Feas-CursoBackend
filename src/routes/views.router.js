// routes/views.router.js
const express = require('express');
const { Router } = require('express');
const { ProductMongo } = require('../daos/mongo/products.daoMongo.js');
const { registerUser } = require('../services/auth.services');
const { authentication } = require('../middleware/auth.js');

const router = Router();
const productsMongo = new ProductMongo();

router.get('/', async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', { style: 'decimal' }).format(prd.price);
  });
  res.render('index', {
    title: 'Inicio',
    product,
  });
});

router.get('/products', authentication, async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', { style: 'decimal' }).format(prd.price);
  });
  res.render('Products', {
    title: 'Productos',
    product,
    scriptView: './js/index.js',
    userName: req.session?.user?.first_name,
  });
});

router.get('/register', async (req, res) => {
  res.render('register', {
    title: 'Registrarse',
  });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const result = await registerUser(email, password);

  if (result.success) {
    res.redirect('/login');
  } else {
    res.render('register', { title: 'Registrarse', error: result.message });
  }
});

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
  });
});

router.get('/chat', async (req, res) => {
  res.render('chat');
});

module.exports = { viewsRouter: router };
