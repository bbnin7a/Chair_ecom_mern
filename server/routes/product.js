const express = require('express');

const { auth, authAdmin } = require('../middleware/auth');
const brandController = require('../controllers/brand');
const productController = require('../controllers/product');
const typeController = require('../controllers/type');

const router = express.Router();

/////////////////////////////////////////
//////      PRODUCTS ROUTE
/////////////////////////////////////////

// *** Fetch products with criteria (POST)
// Criterias:
// {number}limit, {number}skip, {Object}filters(brands:[], types:[], prices:[])
router.post('/shop', productController.fetchProductsWithFilter);

// ***  Get products with sorting, limiting (GET)
// sample: /api/product/products?sortBy=createdAt&order=desc&limit=4
// sample: /api/product/products?sortBy=sold&order=desc&limit=4
router.get('/products', productController.fetchAllProducts);

// *** Get product by IDs (GET)
// sample: /api/product/product_by_id?id=89jfkl,jkl81&type=array
router.get('/product_by_id', productController.getProductByIds);

// *** Create new product (authentication and admin role is needed) (POST)
router.post('/product', auth, authAdmin, productController.createNewProduct);


/////////////////////////////////////////
//////      TYPE ROUTE
/////////////////////////////////////////

// ** Create new type (authentication and admin role is needed) (POST)
router.post('/type', auth, authAdmin, typeController.createProductType);

// Get all types (GET)
router.get('/types', typeController.fetchTypes);



/////////////////////////////////////////
//////      BRAND ROUTE
/////////////////////////////////////////

// *** Create new brand (authentication and admin role is needed) (POST)
router.post('/brand', auth, authAdmin, brandController.createNewBrand);

// ** Get all brands (GET)
router.get('/brands', brandController.getAllBrands);

module.exports = router;
