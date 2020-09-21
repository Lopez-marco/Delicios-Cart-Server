let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Add User
router.post("/add-user", function (req, res) {
  let userModel = {
    username: req.body.user.username,
    password: bcrypt.hashSync(req.body.user.password, 13),
  };
  User.create(userModel)
    .then(function (user) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

// Login
router.post("/login", function (req, res) {
  User.findOne({ where: { user: req.body.user.username } })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });

            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(505).json({
              message: "Invalid username or password",
            });
          }
        });
      } else {
        res.status(504).json({ message: "User not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Get All Users
router.get("/all-users", (req, res) => {
  User.findAll()
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

// Update User
router.put("/user/edit", (req, res) => {
  const userEdit = {
    id: req.body.user.id,
    username: req.body.user.username,
    email: req.body.user.email,
    password: req.body.user.password,
    account_type: req.body.user.account_type,
  };
  user
    .update(userEdit, { where: { id: req.user.id } })
    .then((userEdit) => {
      res.status(200).json({ message: "User updated." });
    })
    .catch((err) => res.status(500).json(err));
});

// Delete User
router.delete("/user/delete", (req, res) => {
  const query = { where: { username: req.user.username } };

  user
    .destroy(query)
    .then(() => res.status(200).json({ message: "User successfully deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
