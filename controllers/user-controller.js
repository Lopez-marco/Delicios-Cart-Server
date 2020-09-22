let router = require("express").Router();
let { models } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Add User
router.post("/add-user", (req, res) => {
  models.user
    .create({
      username: req.body.user.username,
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13),
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

// Login
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

// // Get All Users
// router.get("/all-users", (req, res) => {
//   User.findAll()
//     .then((Users) => {
//       res.json(Users);
//     })
//     .catch((err) => {
//       res.send("error: " + err);
//     });
// });

// // Update User
// router.put("/user/edit", (req, res) => {
//   const userEdit = {
//     id: req.body.user.id,
//     username: req.body.user.username,
//     email: req.body.user.email,
//     password: req.body.user.password,
//     account_type: req.body.user.account_type,
//   };
//   user
//     .update(userEdit, { where: { id: req.user.id } })
//     .then((userEdit) => {
//       res.status(200).json({ message: "User updated." });
//     })
//     .catch((err) => res.status(500).json(err));
// });

// // Delete User
// router.delete("/user/delete", (req, res) => {
//   const query = { where: { username: req.user.username } };

//   user
//     .destroy(query)
//     .then(() => res.status(200).json({ message: "User successfully deleted" }))
//     .catch((err) => res.status(500).json({ error: err }));
// });

module.exports = router;
