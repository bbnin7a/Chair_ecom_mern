require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

const app = express();
const mongoose = require('mongoose');

/** DATABASE CONFIG */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('error message', err);
  });
mongoose.Promise = global.Promise;

/** MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));

/** ROUTES */
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

// //** DEFAULT ROUTE IN PRODUCTION */
if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
  const index = path.join(__dirname, '../client', 'build', 'index.html');
  res.sendFile(index);
});
}

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
