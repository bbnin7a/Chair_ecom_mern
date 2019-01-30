const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cloudinary = require('cloudinary');

// const userRoutes = require('./routes/user')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/** ROUTES */
app.use('/api/users', userRoutes)
app.use('/api/product', productRoutes)


/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
