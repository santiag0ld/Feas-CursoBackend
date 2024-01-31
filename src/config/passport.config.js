const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserDaoMongo = require('../daos/mongo/user.daoMongo').UserMongo;
const GithubStrategy = require('passport-github2');

const passportConfig = (app) => {

  passport.use('github', new GithubStrategy({
    clientID: 'Iv1.989cc3d2cef77af7',
    clientSecret: '38bc9d5172c852c6cd732c4e5cfbe457d1a24276',
    callbackURL: 'http://localhost:8080/githubcallback'
}, async(accesToken, refreshToken, profile, done)=> {
    try {
        console.log(profile);
        const userDaoMongo = new UserDaoMongo();
        const githubEmail = profile._json.email;
        if (!githubEmail) {
            return done(null, false, { message: 'GitHub did not provide a valid email.' });
        }

        let user = await userDaoMongo.getUserByMail(githubEmail);
        if (!user) {
            let newUser = {
                first_name: profile._json.name ? profile._json.name.split(' ')[0] : '',
                last_name: profile._json.name ? profile._json.name.split(' ')[1] || '' : '',
                email: githubEmail,
                password: '123',
                role: 'user',
            };

            let result = await userDaoMongo.createUser(newUser);
            return done(null, result);
        }
        done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const userDaoMongo = new UserDaoMongo();
    const user = await userDaoMongo.getUserByMail(email);

    if (!user) {
      return done(null, false, { message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid password' });
    }

    if (email === 'adminCoder@coder.com') {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDaoMongo = new UserDaoMongo();
    const user = await userDaoMongo.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());
};

module.exports = passportConfig;
