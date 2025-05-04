const pool = require("../db");

const findById = async (id) => {
  const result = await pool.query(
    "SELECT title, author, genre, published_year from books where book_id = $1",
    [id]
  );
  return result.rows[0];
};

const findAll = async () => {
  const result = await pool.query(
    "SELECT title, author, genre, published_year from books"
  );
  return result.rows;
};

const create = async (title, author, genre, publishedYear) => {
  const result = await pool.query(
    "INSERT into books (title, author, genre, published_year) values ($1, $2, $3, $4)",
    [title, author, genre, publishedYear]
  );
  return result.rows[0];
};

const update = async (id, title, author, genre, publishedYear) => {
  const result = await pool.query(
    "Update books SET title = $1, author = $2, genre = $3, published_year = $4 WHERE book_id = $5",
    [title, author, genre, publishedYear, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query("DELETE FROM books WHERE book_id = $1", [id]);
  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
