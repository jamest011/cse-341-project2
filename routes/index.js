const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Intro Page']
    res.send ('Welcome to My Page');});

router.use('/champions', require('./champions'));

module.exports = router;