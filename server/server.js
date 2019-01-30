const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cloudinary = require('cloudinary');

// const userRoutes = require('./routes/user')
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/** DATABASE CONFIG */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

/** MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'))

/** ROUTES */
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

//** DEFAULT ROUTE IN PRODUCTION */
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
