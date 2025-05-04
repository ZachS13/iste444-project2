const pool = require("../db");

const findById = async (id) => {
  const result = await pool.query(
    "SELECT username from users where user_id = $1",
    [id]
  );
  return result.rows[0];
};

const findByUsername = async (username) => {
  const result = await pool.query(
    "SELECT user_id, username, password FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

const findAll = async () => {
  const result = await pool.query("SELECT user_id, username from users");
  return result.rows;
};

const create = async (username, password) => {
  const result = await pool.query(
    "INSERT into users (username, password) values ($1, $2) Returning user_id, username",
    [username, password]
  );
  return result.rows[0];
};

module.exports = {
  findById,
  create,
  findAll,
  findByUsername,
};
