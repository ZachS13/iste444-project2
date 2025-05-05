const express = require('express');
const router = express.Router();
const business = require("../business.js");
const { logRequest } = require("../logger.js");

router.get("/", async (req, res) => {
    const { id } = req.params;
    logRequest({
        endpoint: "/api/v1/book [GET]",
        userId: id
    });

    const books = await business.getAllBooks();
    if (!books) {
        return res.status(404).json({ error: "There was an error getting all of the books!" });
    } else if (books.length === 0) {
        return res.status(404).json({ error: "There are no books!" });
    }
    return res.json({ message: books });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    logRequest({
        endpoint: `/api/v1/book/${id} [GET]`,
        userId: id
    });

    const book = await business.getBookById(id);
    if (!book) {
        return res.status(404).json({ error: `There was an error getting the book!` });
    }
    return res.json({ message: book });
});

router.post("/", async (req, res) => {
    const { title, author, genre, publishedYear, userId } = req.body;

    logRequest({
        endpoint: "/api/v1/book [POST]",
        userId: userId || "unknown"
    });

    if (!title || !author || !genre || !publishedYear) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    const newBook = await business.createBook(title, author, genre, publishedYear);
    if (!newBook) {
        return res.status(404).json({ error: "There was an error creating the book!" });
    }
    return res.json({ message: newBook });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publishedYear, userId } = req.body;

    logRequest({
        endpoint: `/api/v1/book/${id} [PUT]`,
        userId: userId || "unknown"
    });

    if (!title || !author || !genre || !publishedYear) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    const updatedBook = await business.updateBook(id, title, author, genre, publishedYear);
    if (!updatedBook) {
        return res.status(404).json({ error: "There was an error updating the book!" });
    }
    return res.json({ message: updatedBook });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    logRequest({
        endpoint: `/api/v1/book/${id} [DELETE]`,
        userId: req.body?.userId || "unknown"
    });

    const deletedBook = await business.deleteBook(id);
    if (!deletedBook) {
        return res.status(404).json({ error: "There was an error deleting the book!" });
    }
    return res.json({ message: `Book with ID ${id} deleted successfully!` });
});

module.exports = router;
