const express = require('express');
const router = express.Router();

const championsController = require('../controllers/champions');

router.get('/', championsController.getAll);

router.get('/:id', championsController.getSingle);

router.post('/', championsController.createChamp);

router.put('/:id', championsController.updateChamp);

router.delete('/:id', championsController.deleteChamp);

module.exports = router;