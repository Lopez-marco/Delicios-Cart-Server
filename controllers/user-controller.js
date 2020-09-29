let router = require("express").Router();
// let { models } = require("../db");
let User = require("../db").import("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

//create a user *** Works in Postman ***
router.post("/add-user", (req, res) => {
  models.user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
    })
    .then(function userCreated(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({
        message: "User added to database",
        dataAdded_user: user.username,
        dataAdded_email: user.email,
        dataAdded_pass: user.password,
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

//login *** Works in Postman ***
router.post("/login", (req, res) => {
  models.user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(function handleLogin(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: "30d",
            });
            res.status(200).json({
              message: `User signed in succesfully`,
              sessionToken: token,
            });
          } else {
            res.status(505).json({
              message: "Invalid username or password.",
            });
          }
        });
      } else {
        res.status(504).json({ message: "User not Found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// user, update *** Does Not Work in Postman ***
router.put("/user-update/:id", (req, res) => {
  const updateUser = {
    username: req.user.username,
    email: req.user.email,
    password: req.user.password,
    favorite_store: req.user.favorite_store,
    id: req.user.id,
  };

  const singleUserQuery = {
    where: { id: req.params.id, username: req.user.username },
  };

  User.update(updateUser, singleUserQuery)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// admin, update user *** Does Not Work in Postman ***
router.put("/admin-user-update/:id", (req, res) => {
  const adminUpdateUser = {
    username: req.user.username,
    email: req.user.email,
    password: req.user.password,
    account_type: req.user.accout_type,
    id: req.user.id,
  };

  const adminUserQuery = {
    where: { id: req.params.id, username: req.user.username },
  };

  User.update(adminUpdateUser, adminUserQuery)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// admin, sell all users *** Work in Postman ***
router.get("/view-all", (req, res) => {
  models.user
    .findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ error: err, message: "Error displaying all users" })
    );
});

// delete ***** Not Correct *****
router.delete("/delete/:id", function (req, res) {
  console.log(req.params.id);
  models.user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((selectedUser) => {
      selectedUser.destroy();
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
