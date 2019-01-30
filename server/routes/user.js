const express = require('express');
const formidable = require('express-formidable');
const { auth, authAdmin } = require('../middleware/auth');
const userController = require('../controllers/user')
const productController = require('../controllers/product')

const router = express.Router();


/////////////////////////////////////////
//////      USER ROUTE
/////////////////////////////////////////


// *** Authenticate user (GET)
router.get('/auth', auth, userController.authUser);

// *** Register user (POST)
router.post('/register', userController.registerUser);

// *** Login user (POST)
router.post('/login', userController.loginUser);

// *** Logout user - only authenticated user can logout (GET)
router.get('/logout', auth, userController.logoutUser);

// *** Add product to cart (POST)
// sample: /api/users/addToCart?productId=qwe8123984uklj
router.post('/addToCart', auth, userController.addProductToCart);

// *** Decrease product qty by 1 to cart (POST)
// sample: /api/users/cartItemQtyDecrease?productId=qwe8123984uklj
router.post('/cartItemQtyDecrease', auth, userController.decreaseCartItemQty);

// *** Remove cart item (GET)
// sample: /api/user/removeFromCart?productid=jkl18ujio1
router.get('/removeFromCart', auth, userController.removeCartItemFromCart);

// *** Upload files images to cloudinary (POST)
router.post(
  '/uploadimage',
  auth,
  authAdmin,
  formidable(),
  productController.uploadProductImage
);

// ** *** Remove an image (GET)
router.get('/removeimage', auth, authAdmin, productController.removeProductImage);


module.exports = router;

