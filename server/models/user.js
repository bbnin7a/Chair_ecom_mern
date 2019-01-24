const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

/**
 * ===========
 *  PRE-SAVE
 * ===========
 * Hash the password before saving to database, in Two cases:
 * 1) new user is created, 2) existing user updates their password
 */
userSchema.pre('save', function(next) {
  var user = this;

  // Check the password field is it being touched
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/**
 * ================
 *  CUSTOM METHODS
 * ================
 * Compare the password with database
 */
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);

    // if no error, isMatch will be true
    callback(null, isMatch);
  });
};

/**
 * ================
 *  CUSTOM METHODS
 * ================
 * Generate a token using jwt
 */
userSchema.methods.generateToken = function(callback) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  
  // update the token field and save to database
  user.save(function(err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
