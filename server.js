const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3300;

// app.use(express.json());
// app.use(bodyParser.json());
// app.unsubscribe((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         "Access-Control-Allow_Headers",
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//     ),
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });
// app.use('/', require('./routes'));

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    // This is the basic express session({...}) initialization.
    .use(passport.initialize())
    // init passport on every route call
    .use(passport.session())
    // allow passport to use 'express-session'.
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow_Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'POST, GET, PUT, PATCH, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST','DELETE','UPDATE','PUT','PATCH',]}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes/index.js'));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(access_token, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        // });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    // added if else because my github did not have a displayName at the time 
    // and wanted have something displayed for the user
    if (req.session.user !== undefined) {
      const displayName = req.session.user.displayName || req.session.user.username;
      res.send(`Logged in as ${displayName}`);
    } else {
      res.send("Logged Out");
    }
  });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: 'api-docs', 
    session: false
}),   (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
    }
});