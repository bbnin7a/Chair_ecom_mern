const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/** DATABASE MODELS IMPORT */
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Type } = require('./models/type');
const { Product } = require('./models/product');

/** DATABASE CONFIG */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

/** MIDDLEWARE */
const { auth, authAdmin } = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * ROUTES
 */

//=====================
//       PRODUCTS
//=====================

// Get products with sorting, limiting
// sample: /api/product/products?sortBy=createdAt&order=desc&limit=4
// sample: /api/product/products?sortBy=sold&order=desc&limit=4
app.get('/api/product/products', (req, res) => {

  // checking: if query not exist, will given the default value
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  console.log(order);

  Product.find()
    .populate('brand')
    .populate('type')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).send(err);
      res.send(products);
    });
});

// Get product by IDs
// sample: /api/product/product_by_id?id=89jfkl,jkl81&type=array
app.get('/api/product/product_by_id', (req, res) => {
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
});

// Create new product (authentication and admin role is needed)
app.post('/api/product/product', auth, authAdmin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      product: doc
    });
  });
});

// Get all products
// app.get('/api/product/products', (req, res) => {
//   Product.find({}, (err, products) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(products);
//   });
// });

//=====================
//       TYPE
//=====================

// Create new type (authentication and admin role is needed)
app.post('/api/product/type', auth, authAdmin, (req, res) => {
  const type = new Type(req.body);
  type.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      type: doc
    });
  });
});

// Get all types
app.get('/api/product/types', (req, res) => {
  Type.find({}, (err, types) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(types);
  });
});

//=====================
//       BRAND
//=====================

// Create new brand (authentication and admin role is needed)
app.post('/api/product/brand', auth, authAdmin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      sucess: true,
      brand: doc
    });
  });
});

// Get all brands
app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

//=====================
//       USER
//=====================

// Authenticate user
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

// Register user
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  // save to database
  user.save((err, doc) => {
    if (err) return res.json({ registerSuccess: false, err });
    res.status(200).json({
      registerSuccess: true,
      userdata: doc
    });
  });
});

// Login user
app.post('/api/users/login', (req, res) => {
  // 1. find the email to check whether the user exist
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Authentication failed. Email not found'
      });

    // 2. if user exist, then verify the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      // 3. generate a token if password is matched to database
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 4. Set the cookie if token is generated
        res
          .cookie('c_auth', user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

// Logout user - only authenticated user can logout
app.get('/api/users/logout', auth, (req, res) => {
  // access database to unset the token
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
