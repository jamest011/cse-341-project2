const express = require('express');
const router = express.Router();

const championsController = require('../controllers/champions');

router.get('/', championsController.getAll);

router.get('/:id', championsController.getSingle);

module.exports = router;