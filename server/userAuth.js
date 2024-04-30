var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('./db');
const { default: axios } = require('axios');


passport.use(new LocalStrategy((username, password, cb) => {
    db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
  
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, row);
      });
    });
  }));

axios.post("/login/password", passport.authenticate('local', {
    successRedirect:"/",
    failureRedirect:"/",
}))