const { User } = require('../models/user');
const { Product } = require('../models/product');
const { Type } = require('../models/type');
const { Brand } = require('../models/brand');

// ** Create new type (authentication and admin role is needed) (POST)
exports.createProductType = (req, res) => {
  const type = new Type(req.body);
  type.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      type: doc
    });
  });
}

 // Get all types (GET)
exports.fetchTypes = (req, res) => {
  Type.find({}, (err, types) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(types);
  });
}