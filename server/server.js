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
// Register user
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  // save to database
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
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
        if (err) return res.status(400).send(err)

        // 4. Set the cookie if token is generated 
        res.cookie('c_auth', user.token).status(200).json({
          loginSuccess: true
        })
      })
    });

    

  });

});

/** LISTENING PORT */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
