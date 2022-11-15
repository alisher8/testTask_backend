const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  };
    created_user = await User.create(user);
    res.status(201).json(created_user);
};

const signin = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: 600 // 10 min
      });

      if (user = true && passwordIsValid == true) {
        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        })
      }   
})
};

const logOut = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send('LogOut was successfully done');
};

const getCurrentUser = async (req, res) => {
  id = req.params.id;
  User.findOne({
      where: { id: req.params.id },
      attributes: [
          'email'
        ]
  })
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving files."
    });
  });
};
 
module.exports = {
  signin, signup, logOut, getCurrentUser
};