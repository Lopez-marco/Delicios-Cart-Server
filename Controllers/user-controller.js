let router = require("express").Router();
let { models } = require("../db");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let validateSession = require("../Middleware/validate-session");

//create a user *** Works in Postman ***
router.post("/add-user", (req, res) => {
  models.user
    .create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      favorite_store: req.body.favorite_store,
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
        dataAdded_pass: user.account_type,
        sessionToken: token,
        favorite_store: user.favorite_store
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
              favorite_store: user.favorite_store
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

// user, update *** Works in Postman ***
router.put("/user-update", validateSession, (req, res) => {
  const updateUser = {
    // username: req.body.user.username,
    // email: req.body.user.email,
    // password: req.body.user.password,
    favorite_store: req.body.user.favorite_store,
  };

  const singleUserQuery = {
    where: { id: req.user.id },
  };

  models.user
    .update(updateUser, singleUserQuery)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

// admin, update user *** Works in Postman ***
router.put("/admin-user-update/:id", validateSession, (req, res) => {
  const account_type = req.user.account_type;
  if (account_type === true) {
    const adminUpdateUser = {
      account_type: req.body.user.account_type,
    };
    const adminUpdateUserQuery = { where: { id: req.params.id } };

    models.user
      .update(adminUpdateUser, adminUpdateUserQuery)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(502).json({ error: "You are not authorized" });
  }
});

// admin, sell all users *** Works in Postman ***
router.get("/view-all", validateSession, (req, res) => {
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

// delete ***** Works in Postman *****
router.delete("/delete/:id", validateSession, async (req, res) => {
  const account_type = await req.user.account_type;
  if (account_type === true) {
    const userDeleteQuery = { where: { id: req.params.id } };

    models.user
      .destroy(userDeleteQuery)
      .then(() => res.status(200).json({ message: "User Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  }
});

// user controller tested in Postman

module.exports = router;