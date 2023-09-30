const router = require('express').Router();

router.get('/', (req, res) => {res.send ('Welcome to my page');});

router.use('/champions', require('./champions'));

module.exports = router;