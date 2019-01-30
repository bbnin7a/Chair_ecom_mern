const { Brand } = require('../models/brand');

// *** Create new brand (authentication and admin role is needed) (POST)
exports.createNewBrand = (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
}
// ** Get all brands (GET)
exports.getAllBrands = (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
}