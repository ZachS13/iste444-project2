const pool = require("../db");

const create = async (userID, bookID) => {
  const result = await pool.query(
    "INSERT into Checkout (user_id, book_id) values ($1, $2)",
    [userID, bookID]
  );
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query(
    "SELECT user_id, book_id, checkout_date, return_date from Checkout where checkout_id = $1",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  create,
  findById,
};
