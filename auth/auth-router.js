const router = require("express").Router();
const db = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./secret");

router.post("/register", (req, res) => {
  // implement registration
  const { username, password } = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 4;

  db.add({ username, password: bcrypt.hashSync(password, rounds) })
    .then((user) => {
      res.status(201).json({ message: `Welcome ${username}`, token });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error adding new user" });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
