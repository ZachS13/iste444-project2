// Business layer
const userRepo = require("./user/userRepository");
const bookRepo = require("./book/bookRepository");
const checkoutRepo = require("./checkout/checkoutRepository");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  try {
    return await userRepo.findAll();
  } catch (err) {
    console.error("getAllUsers failed:", err);
    return null;
  }
}

async function getUserById(id) {
  if (!id) {
    console.error("getUserById: id is required");
    return null;
  }
  try {
    return await userRepo.findById(id);
  } catch (err) {
    console.error(`getUserById(${id}) failed:`, err);
    return null;
  }
}

async function createUser(username, password) {
  if (!username || !password) {
    console.error("createUser: username and password are required");
    return null;
  }
  try {
    const existing = await userRepo.findAll();
    if (existing.some((u) => u.username === username)) {
      console.error("createUser: username already exists");
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepo.create(username, hashedPassword);
  } catch (err) {
    console.error("createUser failed:", err);
    return null;
  }
}

async function login(username, password) {
  if (!username || !password) {
    console.error("login: username and password are required");
    return null;
  }
  try {
    const user = await userRepo.findByUsername(username);
    if (!user) {
      console.error("login: username not found");
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("login: invalid password");
      return null;
    }

    return { userId: user.user_id, username: user.username };
  } catch (err) {
    console.error("login failed:", err);
    return null;
  }
}

async function getAllBooks() {
  try {
    return await bookRepo.findAll();
  } catch (err) {
    console.error("getAllBooks failed:", err);
    return null;
  }
}

async function getBookById(id) {
  if (!id) {
    console.error("getBookById: id is required");
    return null;
  }
  try {
    return await bookRepo.findById(id);
  } catch (err) {
    console.error(`getBookById(${id}) failed:`, err);
    return null;
  }
}

async function createBook(title, author, genre, publishedYear) {
  if (!title || !author || !publishedYear) {
    console.error("createBook: title, author, and publishedYear are required");
    return null;
  }
  try {
    return await bookRepo.create(title, author, genre, publishedYear);
  } catch (err) {
    console.error("createBook failed:", err);
    return null;
  }
}

async function updateBook(id, title, author, genre, publishedYear) {
  try {
    // optionally validate book exists before update
    const bookExists = await bookRepo.findById(id);
    if (!bookExists) {
      console.warn(`No book with ID ${id} found for update.`);
      return null;
    }

    const updated = await bookRepo.update(id, title, author, genre, publishedYear);
    return updated || bookExists; // return original if no changes
  } catch (err) {
    console.error("updateBook failed:", err);
    return null;
  }
}


async function deleteBook(id) {
  if (!id) {
    console.error("deleteBook: id is required");
    return null;
  }
  try {
    await checkoutRepo.deleteCheckoutsByBookId(id); // delete checkouts first
    return await bookRepo.remove(id);               // then delete the book
  } catch (err) {
    console.error(`deleteBook(${id}) failed:`, err);
    return null;
  }
}


async function getCheckedOutBook(id) {
  if (!id) {
    console.error("getCheckedOutBook: checkout id is required");
    return null;
  }
  try {
    return await checkoutRepo.findById(id);
  } catch (err) {
    console.error(`getCheckedOutBook(${id}) failed:`, err);
    return null;
  }
}

async function getCheckedOutBooksByUser(userid) {
  if (!userid) {
    console.error("getCheckedOutBooksByUser: userId is required");
    return null;
  }
  try {
    return await checkoutRepo.findByUserId(userid);
  } catch (err) {
    console.error(`getCheckedOutBooksByUser(${userid}) failed:`, err);
    return null;
  }
}


async function checkoutBook(bookId, userId) {
  if (!bookId || !userId) {
    console.error("checkoutBook: bookId and userId are required");
    return null;
  }
  try {
    const existing = await checkoutRepo.findById(bookId);
    if (existing && !existing.return_date) {
      console.error("checkoutBook: book is already checked out");
      return null;
    }
    return await checkoutRepo.create(userId, bookId);
  } catch (err) {
    console.error(
      `checkoutBook(userId=${userId}, bookId=${bookId}) failed:`,
      err
    );
    return null;
  }
}



module.exports = {
  getAllUsers,
  getUserById,
  createUser,

  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  login,
  getCheckedOutBook,
  getCheckedOutBooksByUser,
  checkoutBook,
};
