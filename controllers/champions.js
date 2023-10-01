const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags['Champions']
    try {
        const result = await mongodb.getDatabase().collection('champions').find();
        const champions = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json(champions);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json('Internal server error');
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags['Champions']
    try {
        const champId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('champions').find({ _id: champId });
        const champions = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json(champions[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json('Internal server error');
    }
};

const createChamp = async (req, res) => {
    //#swagger.tags['Champions']
    try {
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
    } catch (error) {
        console.error('Error in createChamp:', error);
        res.status(500).json('Internal server error');
    }
};

const updateChamp = async (req, res) => {
    //#swagger.tags['Champions']
    try {
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
    } catch (error) {
        console.error('Error in updateChamp:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteChamp = async (req, res) => {
    //#swagger.tags['Champions']
    try {
        const champId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('champions').deleteOne({ _id: champId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the champion.');
        }
    } catch (error) {
        console.error('Error in deleteChamp:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createChamp,
    updateChamp,
    deleteChamp
};
