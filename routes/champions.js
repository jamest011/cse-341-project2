const express = require('express');
const router = express.Router();

const championsController = require('../controllers/champions');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', championsController.getAll);
router.get('/:id', championsController.getSingle);
router.post('/', isAuthenticated, validation.saveChampion, championsController.createChamp);
router.put('/:id', isAuthenticated, validation.saveChampion, championsController.updateChamp);
router.delete('/:id', isAuthenticated, championsController.deleteChamp);

module.exports = router;