// Information for League of Legends champions pulled from http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    //#swagger.tags['Champions']
    const result = await mongodb.getDatabase().collection('champions').find();
    result.toArray().then((champions) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(champions);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags['Champions']
    const champId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('champions').find( {_id: champId });
    result.toArray().then((champions) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(champions[0]);
    });
};

const createChamp = async (req, res) => {
    //#swagger.tags['Champions']
    const champ = {
        name: req.body.name,
        lane: req.body.lane,
        type: req.body.type,
        difficulty: req.body.difficulty,
        resource: req.body.resource,
        damage: req.body.damage,
        number: req.body.number
    };
    const response = await mongodb.getDatabase().collection('champions').insertOne(champ);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the champion.');
    }
};

const updateChamp = async (req, res) => {
    //#swagger.tags['Champions']
    const champId = new ObjectId(req.params.id);
    const champ = {
        name: req.body.name,
        lane: req.body.lane,
        type: req.body.type,
        difficulty: req.body.difficulty,
        resource: req.body.resource,
        damage: req.body.damage,
        number: req.body.number
    };
    const response = await mongodb.getDatabase().collection('champions').replaceOne({ _id: champId }, champ);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the champion.');
    }
};

const deleteChamp = async (req, res) => {
    //#swagger.tags['Champions']
    const champId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('champions').deleteOne({ _id: champId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the champion.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createChamp,
    updateChamp,
    deleteChamp
};