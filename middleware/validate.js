const validator = require('../helpers/validate');

const saveChampion = async (req, res, next) => {
    const validationRule = {
      "name": 'required|string',
      "lane": 'required|string',
      "type": 'required|string',
      "difficulty": 'required|numeric',
      "resource": 'required|string',
      "damage": 'required|string',
      "number": 'numeric'
    };
  
    try {
        // Received help from a friend in field for this try-catch block
      await new Promise((resolve, reject) => {
        validator(req.body, validationRule, {}, (err, status) => {
          if (!status) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      next();
    } catch (error) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: error,
      });
    }
};

module.exports = {
  saveChampion
};