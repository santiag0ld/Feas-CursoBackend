import passport from 'passport';
import jwt from "passport-jwt";
import { UserMongo } from '../daos/mongo/user.daoMongo.js';
import { Strategy as GithubStrategy } from 'passport-github2';
const JWT_PRIVATE_KEY = process.env.JWT_SECRET_CODE;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const userService = new UserMongo();

const passportConfig = (app) => {

  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["token"];
    }
    return token;
  };

  passport.use("jwt", new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use('github', new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/api/sessions/githubcallback`,
}, async(accesToken, refreshToken, profile, done)=> {
    try {
        console.log(profile);
        const userDaoMongo = new userDaoMongo();
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
                password: '',
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

/*

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const userDaoMongo = new UserMongo();
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
    const userDaoMongo = new userDaoMongo();
    const user = await userDaoMongo.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
*/
app.use(passport.initialize());
app.use(passport.session());
};


export default passportConfig ;
