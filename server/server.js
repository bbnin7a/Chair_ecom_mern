const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/** DATABASE CONFIG */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

/** MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/** MODELS */
const { User } = require('./models/user');

/** ROUTES */
app.post('/api/users/register', (req, res) => {
  res.status(200);
});

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
