const { User } = require('../models/user');
const { Product } = require('../models/product');
const mongoose = require('mongoose');


// *** Authenticate user (GET)
exports.authUser = (req, res) => {
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
};

// *** Register user (POST)
exports.registerUser = (req, res) => {
  const user = new User(req.body);

  // save to database
  user.save((err, doc) => {
    if (err) return res.json({ registerSuccess: false, err });
    res.status(200).json({
      registerSuccess: true,
      userdata: doc
    });
  });
};

// *** Login user (POST)
exports.loginUser = (req, res) => {
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
};

// *** Logout user - only authenticated user can logout (GET)
exports.logoutUser = (req, res) => {
  // access database to unset the token
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ logoutSuccess: false, err });
    return res.status(200).json({
      logoutSuccess: true
    });
  });
}

// *** Add product to cart (POST)
// sample: /api/users/addToCart?productId=qwe8123984uklj
exports.addProductToCart = (req, res) => {
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
}

// *** Decrease product qty by 1 to cart (POST)
// sample: /api/users/cartItemQtyDecrease?productId=qwe8123984uklj
exports.decreaseCartItemQty = (req, res) => {
  const userId = req.user._id;
  const prodId = req.query.productId;

  // get the user data
  User.findOne({ _id: userId }, (err, doc) => {
    if (err) return res.json({ success: false, err });

    doc.cart.forEach(item => {
      if (item.id == prodId) {
        // case 1) check the quantity, if quantity is >1
        if (item.quantity > 1) {
          User.findOneAndUpdate(
            { _id: userId, 'cart.id': mongoose.Types.ObjectId(prodId) },
            { $inc: { 'cart.$.quantity': -1 } },
            { new: true },
            (err, doc) => {
              // reconstruct the response data
              let cart = doc.cart;
              let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
              });

              // get the cartDetail from mongoose
              Product.find({ _id: { $in: array } })
                .populate('brand')
                .populate('type')
                .exec((err, cartDetail) => {
                  return res.status(200).json({
                    cartDetail,
                    cart
                  });
                });

              // if (err) return res.json({ success: false, err });
              // res.status(200).json(doc.cart);
            }
          );
        } else {
          // case 2) remove this item in cart
          User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { cart: { id: mongoose.Types.ObjectId(prodId) } } },
            { new: true },
            (err, doc) => {
              // reconstruct the response data
              let cart = doc.cart;
              let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
              });

              // get the cartDetail from mongoose
              Product.find({ _id: { $in: array } })
                .populate('brand')
                .populate('type')
                .exec((err, cartDetail) => {
                  return res.status(200).json({
                    cartDetail,
                    cart
                  });
                });
            }
          );
        }
      }
    });
  });
}

// *** Remove cart item (GET)
// sample: /api/user/removeFromCart?productid=jkl18ujio1
exports.removeCartItemFromCart = (req, res) => {
  const prodId = req.query.productId;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(prodId) } } },
    { new: true },
    (err, doc) => {
      // reconstruct the response data
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      // get the cartDetail from mongoose
      Product.find({ _id: { $in: array } })
        .populate('brand')
        .populate('type')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
    }
  );
}