const { Product } = require('../models/product');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
require('dotenv').config();

/** CLOUDINARY CONFIG */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


// *** Fetch products with criteria (POST)
// Criterias:
// {number}limit, {number}skip, {Object}filters(brands:[], types:[], prices:[])
exports.fetchProductsWithFilter = (req, res) => {
  // checking: if query not exist, will given the default value
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // sorting the filter data to fit mongodb query
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      // filter.price value (ref): [0, 499]
      // mongo docs (update operators)
      // https://docs.mongodb.com/manual/reference/operator/update/
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        // default case
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // public route can only fetch published product
  findArgs['publish'] = true;

  Product.find(findArgs)
    .populate('brand')
    .populate('type')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: products.length,
        products
      });
    });
};


// ***  Get all products with sorting, limiting (GET)
// sample: /api/product/products?sortBy=createdAt&order=desc&limit=4
// sample: /api/product/products?sortBy=sold&order=desc&limit=4
exports.fetchAllProducts = (req, res) => {
  // checking: if query not exist, will given the default value
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate('brand')
    .populate('type')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).send(err);
      res.send(products);
    });
}


// *** Get product by IDs (GET)
// sample: /api/product/product_by_id?id=89jfkl,jkl81&type=array
exports.getProductByIds = (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  // if query type="array" is attached
  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    // covert the id to mongoose objectid and put them in array
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  // fetch products by the id array (items) 
  Product.find({ _id: { $in: items } })
    .populate('brand')
    .populate('type')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
}

// *** Create new product (authentication and admin role is needed) (POST)
exports.createNewProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      product: doc
    });
  });
}

// *** Upload files images to cloudinary (POST)
exports.uploadProductImage = (req, res) => {
  // cloudinary docs:
  // https://cloudinary.com/documentation/image_transformations
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result)
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
      console.log("done")
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    }
  );
}


// ** *** Remove an image (GET)
exports.removeProductImage = (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).send('ok');
  });
}