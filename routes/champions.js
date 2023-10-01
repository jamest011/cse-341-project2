const express = require('express');
const router = express.Router();

const championsController = require('../controllers/champions');
const validation = require('../middleware/validate');

router.get('/', championsController.getAll);

router.get('/:id', championsController.getSingle);

router.post('/', validation.saveChampion, championsController.createChamp);

router.put('/:id', validation.saveChampion, championsController.updateChamp);

router.delete('/:id', championsController.deleteChamp);

module.exports = router;