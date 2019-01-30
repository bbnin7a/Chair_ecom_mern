const { User } = require('../models/user');

// check normal user
let auth = (req, res, next) => {
  let token = req.cookies.c_auth;

  User.findByToken(token, (err, user) => {
    // if err happens when decoding
    if (err) throw errr;

    // if user does not exist in database
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    // if user is found
    // attach token and user on the request
    req.token = token;
    req.user = user;
    next();
  });
};

// checking the admin role
let authAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.json({ message: 'Permission denied' })
  }
  next()
}

module.exports = { auth, authAdmin };
