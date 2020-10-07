let router = require("express").Router();
let { models } = require("../db");
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

// user, update *** Test in Postman ***
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

  models.user
    .update(updateUser, singleUserQuery)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// admin, update user *** Needs Tested in Postman ***
router.put("/admin-user-update/:id", (req, res) => {
  const account_type = req.user.account_type;
  if (account_type === true) {
    const adminUpdateUser = {
      username: req.body.user.username,
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.user.password, 13),
      account_type: req.body.user.account_type,
    };
    const adminUpdateUserQuery = { where: { id: req.params.id } };

    User.update(adminUpdateUser, adminUpdateUserQuery)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(502).json({ error: "You are not authorized" });
  }
});

// admin, sell all users

/* THIS ONE WORKS IN POSTMAN
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
*/

// *** Needs Tested in Postman *** Added check on account_type
router.get("/view-all", (req, res) => {
  const account_type = req.user.account_type;
  if (account_type === true) {
    models.user
      .findAll()
      .then((users) => res.status(200).json(users))
      .catch((err) =>
        res
          .status(500)
          .json({ error: err, message: "Error displaying all users" })
      );
  } else {
    res.status(502).json({ error: "You are not authorized" });
  }
});

// delete ***** Needs Tested in Postman *****
router.delete("/delete/:id", (req, res) => {
  const account_type = req.user.account_type;
  if (account_type === true) {
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
  } else {
    res.status(502).json({ error: "You are not authorized" });
  }
});

module.exports = router;
