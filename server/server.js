const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

/** database configuration */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

/** middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
