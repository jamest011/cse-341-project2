const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Intro Page']
//     res.send ('Welcome to My Page');});

router.use('/champions', require('./champions'));

router.get('/login', passport.authenticate('github'), (req,res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;