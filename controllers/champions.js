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

module.exports = {
    getAll,
    getSingle
};