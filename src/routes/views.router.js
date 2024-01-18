const express = require('express');
const { Router } = require('express');
const { ProductMongo } = require('../daos/mongo/products.daoMongo.js');
const { registerUser } = require('../services/auth.services');
const { authentication } = require('../middleware/auth.js');
const passport = require('passport');
const passportConfig = require('../config/passport.config');

const router = Router();
const productsMongo = new ProductMongo();

passportConfig(router);

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

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),(req, res)=>{
  req.session.user = req.user
  res.redirect('/')
})

router.get('/register', async (req, res) => {
  res.render('register', {
    title: 'Register',
  });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const result = await registerUser(email, password);

  if (result.success) {
    res.redirect('/login');
  } else {
    res.render('register', { title: 'Register', error: result.message });
  }
});

router.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Login',
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',  
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/chat', async (req, res) => {
  res.render('chat');
});

module.exports = { viewsRouter: router };
