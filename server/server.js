const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/** DATABASE MODELS IMPORT */
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Type } = require('./models/type');
const { Product } = require('./models/product');

/** CLOUDINARY CONFIG */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

/** DATABASE CONFIG */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

/** MIDDLEWARE */
const { auth, authAdmin } = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/** ROUTES */

/////////////////////////////////////////
//////      PRODUCTS ROUTE
/////////////////////////////////////////

// *** Fetch products with criteria (POST)
// Criterias:
// {number}limit, {number}skip, {Object}filters(brands:[], types:[], prices:[])

app.post('/api/product/shop', (req, res) => {
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
});

// ***  Get products with sorting, limiting
// sample: /api/product/products?sortBy=createdAt&order=desc&limit=4
// sample: /api/product/products?sortBy=sold&order=desc&limit=4
app.get('/api/product/products', (req, res) => {
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
});

// *** Get product by IDs (GET)
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

// *** Create new product (authentication and admin role is needed)
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

// *** Upload files images to cloudinary (POST)
app.post(
  '/api/users/uploadimage',
  auth,
  authAdmin,
  formidable(),
  (req, res) => {
    // cloudinary docs:
    // https://cloudinary.com/documentation/image_transformations
    cloudinary.uploader.upload(
      req.files.file.path,
      result => {
        // console.log(result)
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
      }
    );
  }
);

// ** *** Remove an image (GET)
app.get('/api/users/removeimage', auth, authAdmin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).send('ok');
  });
});

/////////////////////////////////////////
//////      TYPE ROUTE
/////////////////////////////////////////

// ** Create new type (authentication and admin role is needed)
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

/////////////////////////////////////////
//////      BRAND ROUTE
/////////////////////////////////////////

// *** Create new brand (authentication and admin role is needed)
app.post('/api/product/brand', auth, authAdmin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc
    });
  });
});

// ** Get all brands
app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

/////////////////////////////////////////
//////      USER ROUTE
/////////////////////////////////////////

// *** Authenticate user
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

// *** Register user
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

// *** Login user
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

// *** Logout user - only authenticated user can logout
app.get('/api/users/logout', auth, (req, res) => {
  // access database to unset the token
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({
      logoutSuccess: true
    });
  });
});

// *** Add product to cart
// sample: /api/users/addToCart?productId=qwe8123984uklj
app.post('/api/users/addToCart', auth, (req, res) => {
  const userId = req.user._id;
  const prodId = req.query.productId;

  // get the user data
  User.findOne({ _id: userId }, (err, doc) => {
    let duplicate = false;

    // check whether the product is existed
    // case 1) if it is, increase the quantity by 1
    // case 2) otherwise, add product to cart
    doc.cart.forEach(item => {
      if (item.id == prodId) {
        duplicate = true;
      }
    });

    // case 1) increase the existing product quantity by 1
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: userId, 'cart.id': mongoose.Types.ObjectId(prodId) },
        { $inc: { 'cart.$.quantity': 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      // case 2) product is new in cart
      User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(prodId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        // get updated document back instead of original after created
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
