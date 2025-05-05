const pool = require("../db");

const create = async (userID, bookID) => {
  const result = await pool.query(
    `INSERT INTO checkouts (user_id, book_id, checkout_date)
     VALUES ($1, $2, CURRENT_DATE)
     RETURNING *`,
    [userID, bookID]
  );
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query(
    "SELECT user_id, book_id, checkout_date, return_date from checkouts where checkout_id = $1",
    [id]
  );
  return result.rows[0];
};

const findByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT b.book_id, b.title, b.author, b.genre, b.published_year, c.checkout_date, c.return_date
     FROM checkouts c
     JOIN books b ON c.book_id = b.book_id
     WHERE c.user_id = $1`,
    [userId]
  );
  return result.rows;
};

const deleteCheckoutsByBookId = async (bookId) => {
  await pool.query("DELETE FROM checkouts WHERE book_id = $1", [bookId]);
};



module.exports = {
  create,
  findById,
  findByUserId,
  deleteCheckoutsByBookId
};
