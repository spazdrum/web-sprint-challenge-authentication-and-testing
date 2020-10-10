const router = require("express").Router();
const db = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./secret");

router.post("/register", valUser, (req, res) => {
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

router.post("/login", genToken, (req, res) => {
  // implement login
  const { username, password } = req.body;

  db.findBy(username)
    .then((user) => {
      if (username && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ message: `Welcome back ${username}`, token });
      } else {
        res.status(403).json({ message: "Incorrect username or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error logging in" });
    });
});

function valUser(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ message: "Please provide username and password" });
  } else {
    next();
  }
}

function genToken(req, res, next) {
  const payload = {
    id: user.id,
    user: user.username,
  };

  const options = {
    expiresIn: 60 * 60 * 1000, // 1 Hour
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}
module.exports = router;
