const pool = require("../db");

const findById = async (id) => {
  const result = await pool.query(
    "SELECT username from User where user_id = $1",
    [id]
  );
  return result.rows[0];
};

const findAll = async () => {
  const result = await pool.query("SELECT user_id, username from User");
  return result.rows;
};

const create = async (user) => {
  const result = await pool.query(
    "INSERT into users (username, password) values ($1, $2)",
    [user.username, user.password]
  );
  return result.rows[0];
};

module.exports = {
  findById,
  create,
  findAll,
};
