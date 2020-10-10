const db = require("../database/dbConfig");

module.exports = {
  add,
  findBy,
  findById,
};

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function findBy(username) {
  return db("users").where({ username }).first();
}

function findById() {
    return db('users')
}
