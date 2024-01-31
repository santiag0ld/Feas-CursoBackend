const { Router } = require('express');
const { userModel } = require('../daos/mongo/models/user.model');
const passport = require('passport');

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, date, email, password } = req.body;

    if (first_name === '' || last_name === '' || email === '' || password === '') {
        return res.send('Por favor, complete todos los campos');
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.send({ status: 'error', error: 'El usuario ya existe' });
        }

        const newUser = {
            first_name,
            last_name,
            date,
            email,
            password,
            role: 'user',
        };

        const result = await userModel.create(newUser);

        res.send({
            status: 'success',
            payload: {
                id: result._id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
            },
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send({ status: 'error', error: 'Internal Server Error' });
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/products', 
    failureRedirect: '/login',
}));

router.get('/logout', async (req, res) => {
    try {
        req.logout();
        res.redirect('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send({ status: 'error', error: 'Internal Server Error' });
    }
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

module.exports = { sessionsRouter: router };
